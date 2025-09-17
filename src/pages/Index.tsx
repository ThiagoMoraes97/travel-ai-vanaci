import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import SearchFilters from '../components/SearchFilters';
import HotelGrid from '../components/HotelGrid';
import ChatDrawer from '../components/ChatDrawer';
import FloatingChatButton from '../components/FloatingChatButton';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Mock hotel data
  const mockHotels = [
    {
      id: '1',
      name: 'Hotel Copacabana Palace',
      location: 'Copacabana, Rio de Janeiro, RJ',
      price: 850,
      rating: 4.8,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Academia'],
      description: 'Luxuoso hotel em Copacabana com vista para o mar e serviços de primeira classe.'
    },
    {
      id: '2',
      name: 'Belmond Copacabana Palace',
      location: 'Copacabana, Rio de Janeiro, RJ',
      price: 1200,
      rating: 4.9,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Restaurante', 'Bar'],
      description: 'Icônico hotel de luxo com tradição centenária e vista espetacular.'
    },
    {
      id: '3',
      name: 'Windsor Atlantica',
      location: 'Barra da Tijuca, Rio de Janeiro, RJ',
      price: 420,
      rating: 4.5,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Academia'],
      description: 'Hotel moderno com excelente localização e ótimo custo-benefício.'
    },
    {
      id: '4',
      name: 'Hilton Rio de Janeiro',
      location: 'Ipanema, Rio de Janeiro, RJ',
      price: 680,
      rating: 4.6,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Restaurante'],
      description: 'Hotel de luxo em Ipanema com vista deslumbrante e serviços excepcionais.'
    },
    {
      id: '5',
      name: 'Sheraton Grand Rio',
      location: 'Leblon, Rio de Janeiro, RJ',
      price: 750,
      rating: 4.7,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Academia', 'Restaurante'],
      description: 'Elegante hotel no Leblon com vista para o mar e comodidades premium.'
    },
    {
      id: '6',
      name: 'Novotel Rio de Janeiro',
      location: 'Flamengo, Rio de Janeiro, RJ',
      price: 380,
      rating: 4.3,
      image: 'hotel-rio.jpg',
      amenities: ['Wi-Fi', 'Piscina', 'Academia'],
      description: 'Hotel confortável com localização estratégica e bom atendimento.'
    }
  ];

  // Load initial hotels
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setHotels(mockHotels);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFiltersChange = (filters: any) => {
    setCurrentFilters(filters);
    setHasSearched(true);
    setIsLoading(true);
    
    toast({
      title: "Filtros aplicados",
      description: "Atualizando resultados...",
    });

    // Simulate API call with filtering
    setTimeout(() => {
      let filteredHotels = [...mockHotels];
      
      // Filter by price range
      if (filters.priceRange) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
        );
      }
      
      // Filter by amenities
      if (filters.amenities && filters.amenities.length > 0) {
        filteredHotels = filteredHotels.filter(hotel =>
          filters.amenities.some((amenity: string) => hotel.amenities.includes(amenity))
        );
      }
      
      // Filter by rating
      if (filters.rating && filters.rating !== 'all') {
        const minRating = parseInt(filters.rating);
        filteredHotels = filteredHotels.filter(hotel => hotel.rating >= minRating);
      }

      setHotels(filteredHotels);
      setIsLoading(false);
    }, 1500);
  };

  const handleChatFiltersUpdate = (aiFilters: any) => {
    // Merge AI filters with current filters
    const updatedFilters = { ...currentFilters, ...aiFilters };
    handleFiltersChange(updatedFilters);
    
    toast({
      title: "IA aplicou filtros",
      description: "Sua busca foi personalizada automaticamente!",
    });
  };

  const getSearchSummary = () => {
    if (!hasSearched) {
      return null;
    }
    
    const filters = currentFilters as any;
    const destination = filters.destination || 'Rio de Janeiro';
    const checkIn = filters.checkIn ? new Date(filters.checkIn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '15 Out';
    const checkOut = filters.checkOut ? new Date(filters.checkOut).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '18 Out';
    const guests = filters.guests ? `${filters.guests} ${filters.guests === '1' ? 'hóspede' : 'hóspedes'}` : '2 hóspedes';
    
    return `${destination} • ${checkIn}-${checkOut} • ${guests}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Search Filters */}
        <SearchFilters onFiltersChange={handleFiltersChange} />
        
        {/* Results Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isLoading 
                ? 'Buscando...' 
                : hasSearched 
                  ? `${hotels.length} hotéis encontrados`
                  : 'Mais recomendados'
              }
            </h2>
            <p className="text-muted-foreground">
              {getSearchSummary() || 'Descubra os melhores hotéis para sua viagem'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Ordenar por:</span>
            <select className="bg-background border border-border rounded px-2 py-1">
              <option>Recomendados</option>
              <option>Menor preço</option>
              <option>Maior avaliação</option>
              <option>Mais próximo</option>
            </select>
          </div>
        </div>

        {/* Hotel Grid */}
        <HotelGrid hotels={hotels} isLoading={isLoading} />
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton
        isOpen={isChatOpen}
        onClick={() => setIsChatOpen(!isChatOpen)}
        hasUnread={false}
      />

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onFiltersUpdate={handleChatFiltersUpdate}
      />
    </div>
  );
};

export default Index;