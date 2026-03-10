import React, { useState } from 'react';
import { 
  Home, 
  Utensils, 
  ShoppingCart, 
  Store, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Clock, 
  TrendingUp, 
  Users, 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet,
  Bell,
  Search,
  Croissant,
  Leaf,
  Timer,
  Carrot,
  MoreVertical,
  Plus,
  Minus,
  Check
} from 'lucide-react';

// --- Types ---
type Tab = 'inicio' | 'recetas' | 'carrito' | 'mercado';

// --- Mock Data ---
const RECIPE_DATA = {
  title: "Pasta Pomodoro Clásica",
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800",
  time: "25 min",
  difficulty: "Fácil",
  portions: "2 pers",
  nutrition: {
    calories: "450 kcal",
    protein: "25g Prot",
    carbs: "55g Carb",
    fats: "12g Grasas"
  },
  ingredients: [
    { id: 1, name: "Pasta Spaghetti (250g)", checked: false },
    { id: 2, name: "Tomates Cherry (200g)", checked: false },
    { id: 3, name: "Ajo fresco (2 dientes)", checked: false },
    { id: 4, name: "Albahaca fresca (1 ramillete)", checked: false },
    { id: 5, name: "Aceite de oliva virgen extra", checked: false }
  ],
  steps: [
    "Poner a hervir abundante agua con sal en una olla grande.",
    "Mientras tanto, saltear el ajo picado con los tomates cherry en aceite de oliva hasta que ablanden."
  ]
};

const CART_DATA = [
  {
    category: "Frutas y Verduras",
    icon: <Leaf className="w-4 h-4 text-primary" />,
    items: [
      { id: 101, name: "Bananas Orgánicas", price: "$4.500/lb", qty: 2, checked: false },
      { id: 102, name: "Manojo de Kale", price: "$11.000 c/u", qty: 1, checked: false }
    ]
  },
  {
    category: "Lácteos",
    icon: <Droplet className="w-4 h-4 text-primary" />,
    items: [
      { id: 201, name: "Leche Entera", price: "$18.500/galón", qty: 1, checked: false }
    ]
  },
  {
    category: "Despensa",
    icon: <Store className="w-4 h-4 text-primary" />,
    items: [
      { id: 301, name: "Arroz Integral", price: "$15.500/paquete", qty: 1, checked: true }
    ]
  }
];

const MARKETS_DATA = [
  { id: 'exito', name: 'Éxito', logo: 'E', badge: 'MEJOR PRECIO', time: '30-45 min', shipping: 'Envío Gratis', total: '$85.400', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'carulla', name: 'Carulla', logo: 'C', badge: 'PREMIUM', time: '15-25 min', shipping: '$5.500 envío', total: '$92.100', color: 'bg-green-700 text-white' },
  { id: 'd1', name: 'D1', logo: 'D', badge: 'AHORRO', time: '40-60 min', shipping: 'Envío Gratis', total: '$68.900', color: 'bg-red-600 text-white' },
  { id: 'jumbo', name: 'Jumbo', logo: 'J', badge: 'VARIEDAD', time: '35-50 min', shipping: 'Envío Gratis', total: '$89.300', color: 'bg-green-600 text-white' }
];

// --- Components ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const [viewingRecipe, setViewingRecipe] = useState(false);

  const navigateTo = (tab: Tab) => {
    setActiveTab(tab);
    setViewingRecipe(false);
  };

  return (
    <div className="flex flex-col h-full bg-bg-light relative pb-20">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {viewingRecipe ? (
          <RecipeDetailView onBack={() => setViewingRecipe(false)} onAddToCart={() => navigateTo('carrito')} />
        ) : (
          <>
            {activeTab === 'inicio' && <HomeView onRecipeClick={() => setViewingRecipe(true)} />}
            {activeTab === 'recetas' && <div className="p-8 text-center text-gray-500 mt-20">Pantalla de Recetas (Explorar)</div>}
            {activeTab === 'carrito' && <CartView onCheckout={() => navigateTo('mercado')} />}
            {activeTab === 'mercado' && <MarketView />}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <NavItem icon={<Home />} label="INICIO" isActive={activeTab === 'inicio' && !viewingRecipe} onClick={() => navigateTo('inicio')} />
        <NavItem icon={<Utensils />} label="RECETAS" isActive={activeTab === 'recetas' || viewingRecipe} onClick={() => navigateTo('recetas')} />
        <NavItem icon={<ShoppingCart />} label="CARRITO" isActive={activeTab === 'carrito'} onClick={() => navigateTo('carrito')} badge={3} />
        <NavItem icon={<Store />} label="MERCADO" isActive={activeTab === 'mercado'} onClick={() => navigateTo('mercado')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, badge }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, badge?: number }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 relative ${isActive ? 'text-primary' : 'text-gray-400'}`}>
      <div className="relative">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
        {badge && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-bold tracking-wider">{label}</span>
    </button>
  );
}

// --- Screen: Home ---
function HomeView({ onRecipeClick }: { onRecipeClick: () => void }) {
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <p className="text-sm text-gray-500">¡Buenos días!</p>
            <h1 className="text-xl font-bold text-gray-900">¡Hola, Chef!</h1>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar recetas o ingredientes..." className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="px-6 flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-gray-900">Categorías Rápidas</h2>
          <button className="text-sm font-semibold text-primary">Ver todo</button>
        </div>
        <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-2">
          <CategoryCard icon={<Croissant className="w-6 h-6 text-orange-500" />} label="Desayuno" bg="bg-orange-50" />
          <CategoryCard icon={<Leaf className="w-6 h-6 text-red-500" />} label="Saludable" bg="bg-red-50" />
          <CategoryCard icon={<Timer className="w-6 h-6 text-gray-700" />} label="Rápido" bg="bg-gray-100" />
          <CategoryCard icon={<Carrot className="w-6 h-6 text-green-600" />} label="Vegetariano" bg="bg-green-50" />
        </div>
      </div>

      {/* Sugerencia del día */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Sugerencia del día</h2>
        <div className="relative rounded-3xl overflow-hidden h-64 shadow-md cursor-pointer" onClick={onRecipeClick}>
          <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80" alt="Sancocho" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Heart className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">Recomendado</span>
            <h3 className="text-2xl font-bold text-white leading-tight mb-2">Sancocho Trifásico Especial</h3>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 90 min</span>
              <span className="flex items-center gap-1">★ 4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recetas de Temporada */}
      <div className="mb-4">
        <div className="px-6 flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recetas de Temporada</h2>
          <button className="text-sm font-semibold text-primary">Explorar</button>
        </div>
        <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-4">
          <SeasonCard title="Bandeja Paisa Tradicional" meta="45 min • 3 ingredientes en carro" img="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" badge="FÁCIL" />
          <SeasonCard title="Ajiaco con Pollo" meta="30 min • 5 ingredientes" img="https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=400&q=80" badge="MEDIO" />
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, bg }: { icon: React.ReactNode, label: string, bg: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px]">
      <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

function SeasonCard({ title, meta, img, badge }: { title: string, meta: string, img: string, badge: string }) {
  return (
    <div className="min-w-[240px] bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
      <div className="relative h-32 rounded-xl overflow-hidden mb-3">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{badge}</span>
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{meta}</p>
    </div>
  );
}

// --- Screen: Recipe Detail ---
function RecipeDetailView({ onBack, onAddToCart }: { onBack: () => void, onAddToCart: () => void }) {
  return (
    <div className="bg-bg-light pb-8">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-bg-light/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Detalle de Receta</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="px-4 pt-2">
        <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-xl">
          <img src={RECIPE_DATA.image} alt={RECIPE_DATA.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">Destacado</span>
            <h1 className="text-3xl font-bold text-white leading-tight">{RECIPE_DATA.title}</h1>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 flex gap-3 mt-6">
        <StatCard icon={<Clock className="w-5 h-5 text-primary" />} label="TIEMPO" value={RECIPE_DATA.time} />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="DIFICULTAD" value={RECIPE_DATA.difficulty} />
        <StatCard icon={<Users className="w-5 h-5 text-primary" />} label="PORCIONES" value={RECIPE_DATA.portions} />
      </div>

      {/* Nutrition */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Información Nutricional</h3>
        <div className="grid grid-cols-2 gap-3">
          <NutritionCard icon={<Flame className="w-4 h-4 text-primary" />} label="CALORÍAS" value={RECIPE_DATA.nutrition.calories} />
          <NutritionCard icon={<Dumbbell className="w-4 h-4 text-primary" />} label="PROTEÍNA" value={RECIPE_DATA.nutrition.protein} />
          <NutritionCard icon={<Wheat className="w-4 h-4 text-primary" />} label="CARBOHIDRATOS" value={RECIPE_DATA.nutrition.carbs} />
          <NutritionCard icon={<Droplet className="w-4 h-4 text-primary" />} label="GRASAS" value={RECIPE_DATA.nutrition.fats} />
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-6 mt-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-gray-900">Ingredientes</h3>
          <span className="text-sm font-medium text-primary">{RECIPE_DATA.ingredients.length} elementos</span>
        </div>
        <div className="space-y-3">
          {RECIPE_DATA.ingredients.map((ing) => (
            <label key={ing.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50 cursor-pointer">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                {ing.checked && <div className="w-3 h-3 rounded-full bg-primary"></div>}
              </div>
              <span className="text-gray-700 font-medium">{ing.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 mt-8">
        <button onClick={onAddToCart} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/30 transition-transform active:scale-[0.98]">
          <ShoppingCart className="w-5 h-5" />
          Convertir ingredientes en lista de mercado
        </button>
      </div>

      {/* Preparation */}
      <div className="px-6 mt-10 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Preparación</h3>
        <div className="relative pl-6 border-l-2 border-primary/20 space-y-8 ml-2">
          {RECIPE_DATA.steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shadow-sm">
                {idx + 1}
              </div>
              <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center">
      <div className="mb-2">{icon}</div>
      <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}

function NutritionCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center">
      <div className="mb-1">{icon}</div>
      <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}

// --- Screen: Shopping Cart ---
function CartView({ onCheckout }: { onCheckout: () => void }) {
  return (
    <div className="bg-bg-light min-h-full flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-bg-light/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Lista de Compras</h2>
        <button className="w-10 h-10 flex items-center justify-center text-gray-700">
          <MoreVertical className="w-5 h-5" />
        </button>
      </nav>

      {/* List */}
      <div className="px-6 pt-4 pb-32 flex-1">
        {CART_DATA.map((section, idx) => (
          <div key={idx} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {section.icon}
                <h3 className="text-base font-bold text-gray-900">{section.category}</h3>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{section.items.length} artículos</span>
            </div>
            
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id} className={`flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50 transition-opacity ${item.checked ? 'opacity-60' : ''}`}>
                  <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${item.checked ? 'bg-primary border-primary text-white' : 'border-gray-200'}`}>
                    {item.checked && <Check className="w-4 h-4" />}
                  </button>
                  <div className="flex-1">
                    <p className={`font-semibold text-gray-900 ${item.checked ? 'line-through text-gray-500' : ''}`}>{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button className="w-6 h-6 flex items-center justify-center text-primary"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-[480px] mx-auto px-6 pb-4 z-40">
        <div className="bg-gray-900 rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">TOTAL ESTIMADO</p>
            <p className="text-2xl font-bold text-white">$52.600</p>
          </div>
          <button onClick={onCheckout} className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-transform active:scale-95">
            <ShoppingCart className="w-4 h-4" />
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Screen: Market Compare ---
function MarketView() {
  return (
    <div className="bg-bg-light min-h-full">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-bg-light/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Comparar Supermercados</h2>
        <button className="w-10 h-10 flex items-center justify-center text-gray-700">
          <Search className="w-5 h-5" />
        </button>
      </nav>

      {/* Tabs */}
      <div className="px-6 flex gap-6 border-b border-gray-200 mt-2">
        <button className="pb-3 text-sm font-bold text-primary border-b-2 border-primary">Cerca de mí</button>
        <button className="pb-3 text-sm font-semibold text-gray-500">Más baratos</button>
        <button className="pb-3 text-sm font-semibold text-gray-500">Más rápidos</button>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-bold text-gray-900">Opciones para tu receta</h3>
          <span className="text-sm font-medium text-primary">4 tiendas</span>
        </div>

        <div className="space-y-4">
          {MARKETS_DATA.map((market) => (
            <div key={market.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner ${market.color}`}>
                    {market.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{market.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {market.time}</span>
                      <span className="flex items-center gap-1 text-green-600 font-medium"><Store className="w-3 h-3" /> {market.shipping}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  market.badge === 'MEJOR PRECIO' ? 'bg-orange-100 text-orange-700' :
                  market.badge === 'PREMIUM' ? 'bg-gray-100 text-gray-600' :
                  market.badge === 'AHORRO' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {market.badge}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total estimado</p>
                  <p className="text-xl font-bold text-gray-900">{market.total}</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md shadow-primary/20 transition-transform active:scale-95">
                  Seleccionar y Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
