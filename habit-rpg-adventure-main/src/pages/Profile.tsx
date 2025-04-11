
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabitContext } from '@/context/HabitContext';
import { motion } from 'framer-motion';
import RewardItemCard from '@/components/ui-custom/RewardItemCard';
import { ItemRarity, ItemType } from '@/types';
import { 
  FilterIcon, 
  ArrowUpDown, 
  LayoutGrid, 
  Search,
  Backpack,
  Crown
} from 'lucide-react';

const rarityOrder = {
  'common': 1,
  'uncommon': 2,
  'rare': 3,
  'epic': 4,
  'legendary': 5,
  'mythic': 6
};

const Profile = () => {
  const { userProfile, equipItem, unequipItem } = useHabitContext();
  const navigate = useNavigate();
  const [filterRarity, setFilterRarity] = useState<ItemRarity | 'all'>('all');
  const [filterType, setFilterType] = useState<ItemType | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'level' | 'rarity'>('level');
  const [searchText, setSearchText] = useState('');
  
  const filteredInventory = userProfile.inventory
    .filter(item => !Object.values(userProfile.equippedItems).includes(item.id))
    .filter(item => filterRarity === 'all' || item.rarity === filterRarity)
    .filter(item => filterType === 'all' || item.type === filterType)
    .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                   item.description.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'level') {
        return (a.requiredLevel || 1) - (b.requiredLevel || 1);
      } else {
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
    });
  
  return (
    <div className="min-h-screen bg-solo-darker text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-solo-blue-light">
            {userProfile.username}'s Inventory
          </h1>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 text-sm bg-solo-dark hover:bg-solo-gray rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
          </div>
        </div>
        
        <div className="mb-6 p-3 border border-solo-blue/20 rounded-md bg-solo-dark">
          <div className="flex items-center gap-2 mb-3">
            <Backpack className="w-5 h-5 text-solo-blue-light" />
            <h2 className="text-lg font-medium">Inventory Management</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-solo-darker border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value as ItemRarity | 'all')}
                className="flex-1 px-3 py-2 bg-solo-darker border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
                <option value="mythic">Mythic</option>
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ItemType | 'all')}
                className="flex-1 px-3 py-2 bg-solo-darker border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue"
              >
                <option value="all">All Types</option>
                <option value="sword">Swords</option>
                <option value="dagger">Daggers</option>
                <option value="staff">Staffs</option>
                <option value="bow">Bows</option>
                <option value="shield">Shields</option>
                <option value="armor">Armor</option>
                <option value="accessory">Accessories</option>
                <option value="potion">Potions</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <button 
              onClick={() => setSortOrder(sortOrder === 'level' ? 'rarity' : 'level')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by: {sortOrder === 'level' ? 'Level Req.' : 'Rarity'}
            </button>
            
            <div className="text-sm">
              {userProfile.inventory.length} total items
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border border-solo-blue/30 bg-solo-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold">Equipped Items</h2>
            </div>
            
            {Object.keys(userProfile.equippedItems).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(userProfile.equippedItems).map(([type, itemId]) => {
                  const item = userProfile.inventory.find(i => i.id === itemId);
                  if (!item) return null;
                  
                  return (
                    <RewardItemCard 
                      key={item.id} 
                      item={item} 
                      isEquipped={true}
                      onUnequip={unequipItem}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 p-4 text-center border border-dashed border-gray-700 rounded-md">
                No items equipped. Equip items from your inventory to gain their benefits.
              </p>
            )}
          </div>
          
          <div className="border border-solo-blue/30 bg-solo-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-5 h-5 text-solo-blue-light" />
              <h2 className="text-xl font-semibold">Available Items</h2>
            </div>
            
            {filteredInventory.length > 0 ? (
              <div className="space-y-4">
                {filteredInventory.map(item => (
                  <RewardItemCard 
                    key={item.id} 
                    item={item} 
                    onEquip={equipItem}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 p-6 text-center border border-dashed border-gray-700 rounded-md">
                {searchText || filterRarity !== 'all' || filterType !== 'all' ? 
                  "No items match your search criteria." :
                  "Your inventory is empty. Complete quests and dungeons to earn rewards!"
                }
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
