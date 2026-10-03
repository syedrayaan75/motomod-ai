export interface BikeSpec {
  id: number;
  brand: 'Royal Enfield' | 'KTM' | 'Honda' | 'Bajaj' | 'Yamaha' | 'TVS' | 'Kawasaki' | 'BMW' | 'Triumph' | 'Harley-Davidson';
  model: string;
  priceExShowroom: string;
  engineCc: number;
  powerBhp: number;
  torqueNm: number;
  weightKg: number;
  seatHeightMm: number;
  stockFuelEconomyKmL: number;
  bestFor: string;
  imageUrl: string;
  stockExhaust: string;
  stockHandlebar: string;
  stockTail: string;
  stockBraking: string;
  deepDive: {
    transmission: string;
    chassis: string;
    braking: string;
    tyres: string;
    electricals: string;
    compatibilityTags: string[];
  };
}

export interface PartSpec {
  id: number;
  brand: string;
  name: string;
  description: string;
  category: 'BODY' | 'ENGINE' | 'EXHAUST' | 'LIGHTS' | 'BRAKES' | 'SUSP.';
  priceInr: number;
  difficulty: 'Easy' | 'Medium' | 'Hard / Expert';
  compatibleBikes: string[];
  perfImpact: {
    powerGainBhp: number;
    torqueGainNm: number;
    weightDeltaKg: number;
    fuelEconomyDeltaKmL: number;
    heatIncrease: boolean;
    ecuRemapRequired: boolean;
  };
}

export interface FeaturedBuild {
  id: number;
  title: string;
  style: string;
  baseBike: string;
  costInr: number;
  isFeatured?: boolean;
  imageUrl: string;
  prompt: string;
  partsList: string[];
  likes: number;
  commentsCount: number;
  author: string;
  authorAge?: number;
  authorPhone?: string;
}

export interface ServiceProvider {
  id: number;
  providerType: 'Custom Shop' | 'Verified Mechanic';
  name: string;
  location: string;
  distKm: number;
  starRating: number;
  specialties: string[];
  phone: string;
}

export const BIKES_DATABASE: BikeSpec[] = [
  // ==========================================
  // 1. ROYAL ENFIELD (10 MODELS)
  // ==========================================
  {
    id: 1,
    brand: 'Royal Enfield',
    model: 'Hunter 350',
    priceExShowroom: '₹ 1.50 - 1.75 Lakh',
    engineCc: 349,
    powerBhp: 20.2,
    torqueNm: 27.0,
    weightKg: 181,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 36,
    bestFor: 'Cafe · Tracker',
    imageUrl: '/bikes/hunter350.svg',
    stockExhaust: 'Stock stubby black muffler',
    stockHandlebar: 'Flat bar — upright stance',
    stockTail: 'Compact rear mudguard + turn signals',
    stockBraking: 'Single disk ABS, standard lines',
    deepDive: {
      transmission: '5-Speed mesh gearbox with wet multi-plate clutch',
      chassis: 'Twin down-tube spine frame designed by Harris Performance',
      braking: '300mm front disc with twin piston floating caliper / 270mm rear disc',
      tyres: '110/70-17 Front, 140/70-17 Rear Tubeless Alloys',
      electricals: 'Analogue-digital instrument console with Tripper Navigation option',
      compatibilityTags: ['Tail Tidy', 'Slip-on Exhaust', 'Clip-ons', 'LED Halo', 'ECU Flash']
    }
  },
  {
    id: 2,
    brand: 'Royal Enfield',
    model: 'Classic 350',
    priceExShowroom: '₹ 1.93 - 2.25 Lakh',
    engineCc: 349,
    powerBhp: 20.2,
    torqueNm: 27.0,
    weightKg: 195,
    seatHeightMm: 805,
    stockFuelEconomyKmL: 37,
    bestFor: 'Bobber · Brat',
    imageUrl: '/bikes/classic350.svg',
    stockExhaust: 'Peashooter OEM exhaust',
    stockHandlebar: 'Wide cruiser handlebar',
    stockTail: 'Heavy teardrop fender',
    stockBraking: 'Dual channel ABS with standard lines',
    deepDive: {
      transmission: '5-Speed constant mesh gearbox',
      chassis: 'Twin downtube spine frame',
      braking: '300mm front disc caliper / 270mm rear disc',
      tyres: '100/90-19 Front, 120/80-18 Rear Spoke/Alloy wheels',
      electricals: 'Classic round nacelle headlight with LCD odometer display',
      compatibilityTags: ['Spring Solo Seat', 'Brat Exhaust', 'Wide Handlebars', 'Custom Tank Wrap']
    }
  },
  {
    id: 3,
    brand: 'Royal Enfield',
    model: 'Bullet 350',
    priceExShowroom: '₹ 1.74 - 2.16 Lakh',
    engineCc: 349,
    powerBhp: 20.2,
    torqueNm: 27.0,
    weightKg: 195,
    seatHeightMm: 805,
    stockFuelEconomyKmL: 37,
    bestFor: 'Legend Classic',
    imageUrl: '/bikes/bullet350.svg',
    stockExhaust: 'Chrome heavy thumping muffler',
    stockHandlebar: 'Traditional raised handlebar',
    stockTail: 'Classic metal tail cowl with square tail lamp',
    stockBraking: 'Single/Dual channel ABS options',
    deepDive: {
      transmission: '5-Speed constant mesh gearbox',
      chassis: 'J-platform twin downtube spine chassis',
      braking: '300mm front disc / 270mm rear disc',
      tyres: '100/90-19 Front, 120/80-18 Rear Spoke Wheels',
      electricals: 'Analogue gauge with LCD multi-info window & wing-badge nacelle',
      compatibilityTags: ['Gold Pinstripe Tank', 'Straight Exhaust', 'Leather Saddlebags']
    }
  },
  {
    id: 4,
    brand: 'Royal Enfield',
    model: 'Meteor 350',
    priceExShowroom: '₹ 2.06 - 2.30 Lakh',
    engineCc: 349,
    powerBhp: 20.2,
    torqueNm: 27.0,
    weightKg: 191,
    seatHeightMm: 765,
    stockFuelEconomyKmL: 35,
    bestFor: 'Cruiser · Tourer',
    imageUrl: '/bikes/meteor350.svg',
    stockExhaust: 'Sleek black/chrome cruiser silencer',
    stockHandlebar: 'Swept-back cruiser handlebar',
    stockTail: 'Integrated pillion backrest & LED tail lamp',
    stockBraking: '300mm front disc, 270mm rear disc with dual ABS',
    deepDive: {
      transmission: '5-Speed gearbox with heel-and-toe shifter',
      chassis: 'Twin downtube spine frame',
      braking: '300mm front disc / 270mm rear disc',
      tyres: '100/90-19 Front, 140/70-17 Rear Alloy Tubeless',
      electricals: 'Tripper turn-by-turn navigation pod & LED halo headlight',
      compatibilityTags: ['Touring Visor', 'Pillion Backrest', 'Stage-1 Exhaust', 'Highway Footpegs']
    }
  },
  {
    id: 5,
    brand: 'Royal Enfield',
    model: 'Continental GT 650',
    priceExShowroom: '₹ 3.19 - 3.45 Lakh',
    engineCc: 648,
    powerBhp: 47.0,
    torqueNm: 52.0,
    weightKg: 214,
    seatHeightMm: 804,
    stockFuelEconomyKmL: 25,
    bestFor: 'Cafe Racer',
    imageUrl: '/bikes/gt650.svg',
    stockExhaust: 'Twin chrome mufflers',
    stockHandlebar: 'Clip-on handlebars',
    stockTail: 'Classic cafe cowl',
    stockBraking: 'ByBre 320mm front disc with Bosch dual channel ABS',
    deepDive: {
      transmission: '6-Speed mesh gearbox with assist & slipper clutch',
      chassis: 'Steel tubular double cradle frame designed by Harris Performance',
      braking: '320mm front disc / 240mm rear disc',
      tyres: '100/90-18 Front, 130/70-18 Rear Ceat Zoom Cruz',
      electricals: 'Twin pod analogue speedo & tachometer with LED headlight',
      compatibilityTags: ['Red Rooster Twin', 'Brembo Master', 'Custom Cowl', 'Öhlins Rear']
    }
  },
  {
    id: 6,
    brand: 'Royal Enfield',
    model: 'Interceptor 650',
    priceExShowroom: '₹ 3.03 - 3.31 Lakh',
    engineCc: 648,
    powerBhp: 47.0,
    torqueNm: 52.0,
    weightKg: 217,
    seatHeightMm: 804,
    stockFuelEconomyKmL: 25,
    bestFor: 'Retro Roadster',
    imageUrl: '/bikes/interceptor650.svg',
    stockExhaust: 'Twin upswept chrome exhausts',
    stockHandlebar: 'Wide braced handlebar',
    stockTail: 'Traditional flat seat and tail lamp',
    stockBraking: 'ByBre 320mm front disc with Bosch ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Steel tubular double cradle frame',
      braking: '320mm front disc, 240mm rear disc',
      tyres: '100/90-18 Front, 130/70-18 Rear',
      electricals: 'Twin pod digital-analogue instrument console with LED headlight',
      compatibilityTags: ['S&S Twin Mufflers', 'Touring Seat', 'Cast Alloy Wheels', 'Flyscreen']
    }
  },
  {
    id: 7,
    brand: 'Royal Enfield',
    model: 'Himalayan 452',
    priceExShowroom: '₹ 2.85 - 2.98 Lakh',
    engineCc: 452,
    powerBhp: 40.0,
    torqueNm: 40.0,
    weightKg: 196,
    seatHeightMm: 825,
    stockFuelEconomyKmL: 30,
    bestFor: 'ADV Tourer',
    imageUrl: '/bikes/himalayan452.svg',
    stockExhaust: 'High clearance upswept muffler',
    stockHandlebar: 'Wide braced adventure bar',
    stockTail: 'Tail rack with integrated LED tail lights',
    stockBraking: '320mm disc front, 270mm disc rear with switchable ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch & Ride-by-Wire',
      chassis: 'Steel twin spar tubular frame with USD front forks',
      braking: '320mm front disc / 270mm rear disc with off-road ABS mode',
      tyres: '90/90-21 Front, 140/80-17 Rear Spoke Dual Purpose',
      electricals: '4-inch round TFT display with full Google Maps navigation integration',
      compatibilityTags: ['High Windscreen', 'Pannier Stays', 'Tubeless Spoke Rims', 'Aux Lights']
    }
  },
  {
    id: 8,
    brand: 'Royal Enfield',
    model: 'Guerrilla 450',
    priceExShowroom: '₹ 2.39 - 2.54 Lakh',
    engineCc: 452,
    powerBhp: 40.0,
    torqueNm: 40.0,
    weightKg: 185,
    seatHeightMm: 780,
    stockFuelEconomyKmL: 31,
    bestFor: 'Urban Roadster',
    imageUrl: '/bikes/guerrilla450.svg',
    stockExhaust: 'Compact under-engine mass exhaust',
    stockHandlebar: 'Wide flat roadster bar',
    stockTail: 'Minimalist sport tail tidy',
    stockBraking: '310mm disc front, 270mm disc rear with dual channel ABS',
    deepDive: {
      transmission: '6-Speed with Assist & Slipper Clutch',
      chassis: 'Steel twin spar frame with Showa telescopic front forks',
      braking: '310mm front disc, 270mm rear disc',
      tyres: '120/70-17 Front, 160/60-17 Rear Ceat Gripp XL',
      electricals: 'Round 4-inch TFT display with Google Maps navigation & Performance modes',
      compatibilityTags: ['Performance Slip-on', 'Bar End Mirrors', 'Belly Pan']
    }
  },
  {
    id: 9,
    brand: 'Royal Enfield',
    model: 'Shotgun 650',
    priceExShowroom: '₹ 3.59 - 3.73 Lakh',
    engineCc: 648,
    powerBhp: 47.0,
    torqueNm: 52.3,
    weightKg: 240,
    seatHeightMm: 795,
    stockFuelEconomyKmL: 24,
    bestFor: 'Custom Bobber',
    imageUrl: '/bikes/shotgun650.svg',
    stockExhaust: 'Twin peashooter blacked-out exhausts',
    stockHandlebar: 'Flat wide drag handlebar',
    stockTail: 'Modular luggage rack / removable pillion seat',
    stockBraking: 'Twin 320mm front discs with ByBre calipers',
    deepDive: {
      transmission: '6-Speed mesh gearbox with slipper clutch',
      chassis: 'Steel tubular spine frame with Showa USD Big Piston forks',
      braking: '320mm front disc / 300mm rear disc',
      tyres: '100/90-18 Front, 150/70-17 Rear Tubeless Alloy',
      electricals: 'Digital-analogue cluster with Tripper navigation pod',
      compatibilityTags: ['Solo Bobber Seat', 'Twin Akrapovič', 'Custom Paint Kit']
    }
  },
  {
    id: 10,
    brand: 'Royal Enfield',
    model: 'Super Meteor 650',
    priceExShowroom: '₹ 3.64 - 3.94 Lakh',
    engineCc: 648,
    powerBhp: 47.0,
    torqueNm: 52.3,
    weightKg: 241,
    seatHeightMm: 740,
    stockFuelEconomyKmL: 25,
    bestFor: 'Highway Cruiser',
    imageUrl: '/bikes/supermeteor650.svg',
    stockExhaust: 'Dual chrome twin mufflers',
    stockHandlebar: 'Forward-extended cruiser handlebars',
    stockTail: 'Touring seat with pillion backrest',
    stockBraking: 'ByBre 320mm disc front, 300mm rear disc with dual ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Steel tubular spine frame with Showa USD forks',
      braking: '320mm front disc / 300mm rear disc',
      tyres: '100/90-19 Front, 150/80-16 Rear Tubeless Alloy',
      electricals: 'Full LED headlight with Tripper navigation & USB charging',
      compatibilityTags: ['Touring Screen', 'Deluxe Touring Seat', 'Panniers Kit']
    }
  },

  // ==========================================
  // 2. KTM (7 MODELS)
  // ==========================================
  {
    id: 11,
    brand: 'KTM',
    model: 'Duke 390',
    priceExShowroom: '₹ 3.11 Lakh',
    engineCc: 399,
    powerBhp: 45.3,
    torqueNm: 39.0,
    weightKg: 168,
    seatHeightMm: 820,
    stockFuelEconomyKmL: 28,
    bestFor: 'Street Fighter',
    imageUrl: '/bikes/duke390.svg',
    stockExhaust: 'Underbelly stock collector',
    stockHandlebar: 'Aggressive wide aluminum tapered bar',
    stockTail: 'Extended plastic tail arm',
    stockBraking: 'Radial 4-piston ByBre caliper with Supermoto ABS',
    deepDive: {
      transmission: '6-Speed with PASC slipper clutch and Quickshifter+',
      chassis: 'Split trellis frame (powder coated orange/white)',
      braking: '320mm front disc, 240mm rear disc with Bosch 9.3 MP ABS',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Metzeler Sportec M9RR',
      electricals: '5-inch TFT color display with Bluetooth navigation and launch control',
      compatibilityTags: ['Quickshifter+', 'Track ECU', 'Akrapovič Slip-On', 'Billet Levers']
    }
  },
  {
    id: 12,
    brand: 'KTM',
    model: 'Duke 250',
    priceExShowroom: '₹ 2.39 Lakh',
    engineCc: 249,
    powerBhp: 31.0,
    torqueNm: 25.0,
    weightKg: 163,
    seatHeightMm: 820,
    stockFuelEconomyKmL: 32,
    bestFor: 'Naked Street',
    imageUrl: '/bikes/duke250.svg',
    stockExhaust: 'Underbelly exhaust system',
    stockHandlebar: 'Wide aluminum handlebar',
    stockTail: 'Sharp sport tail section',
    stockBraking: 'ByBre 320mm disc with dual channel ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Steel trellis frame with powder-coated subframe',
      braking: '320mm front disc, 240mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear',
      electricals: '5-inch LCD digital console with Quickshifter option',
      compatibilityTags: ['Slip-on Muffler', 'Tail Tidy', 'Lever Guards', 'Crash Bungs']
    }
  },
  {
    id: 13,
    brand: 'KTM',
    model: 'Duke 200',
    priceExShowroom: '₹ 1.97 Lakh',
    engineCc: 199,
    powerBhp: 25.0,
    torqueNm: 19.3,
    weightKg: 159,
    seatHeightMm: 822,
    stockFuelEconomyKmL: 35,
    bestFor: 'Urban Street',
    imageUrl: '/bikes/duke200.svg',
    stockExhaust: 'Underbelly quiet exhaust',
    stockHandlebar: 'Flat wide street bar',
    stockTail: 'Dual split tail section',
    stockBraking: '300mm front disc with Supermoto ABS',
    deepDive: {
      transmission: '6-Speed transmission',
      chassis: 'Lightweight steel trellis frame',
      braking: '300mm front disc, 230mm rear disc',
      tyres: '110/70-17 Front, 150/60-17 Rear MRF Revz',
      electricals: 'Digital LCD display panel with gear position indicator',
      compatibilityTags: ['Exhaust System', 'Crash Guards', 'LED Indicators']
    }
  },
  {
    id: 14,
    brand: 'KTM',
    model: 'RC 390',
    priceExShowroom: '₹ 3.18 Lakh',
    engineCc: 373,
    powerBhp: 43.5,
    torqueNm: 37.0,
    weightKg: 172,
    seatHeightMm: 835,
    stockFuelEconomyKmL: 27,
    bestFor: 'Track Sport',
    imageUrl: '/bikes/rc390.svg',
    stockExhaust: 'Side mounted aluminum muffler',
    stockHandlebar: 'Low race clip-ons',
    stockTail: 'Integrated pillion seat cowl',
    stockBraking: 'Radial 4-piston caliper with cornering ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Ultra lightweight trellis frame',
      braking: '320mm disc front, 230mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Michelin Road 5',
      electricals: 'Full TFT display with Supermoto ABS mode',
      compatibilityTags: ['Race ECU', 'Full Exhaust', 'Carbon Wings', 'Quickshifter']
    }
  },
  {
    id: 15,
    brand: 'KTM',
    model: 'RC 200',
    priceExShowroom: '₹ 2.18 Lakh',
    engineCc: 199,
    powerBhp: 25.0,
    torqueNm: 19.2,
    weightKg: 160,
    seatHeightMm: 835,
    stockFuelEconomyKmL: 34,
    bestFor: 'Race Entry',
    imageUrl: '/bikes/rc200.svg',
    stockExhaust: 'Underbelly aerodynamic exhaust',
    stockHandlebar: 'Clip-on race bars',
    stockTail: 'Track aerodynamic cowl',
    stockBraking: '300mm front disc with dual channel ABS',
    deepDive: {
      transmission: '6-Speed constant mesh gearbox',
      chassis: 'Trellis frame with WP APEX suspension',
      braking: '300mm front disc, 230mm rear disc',
      tyres: '110/70-17 Front, 150/60-17 Rear',
      electricals: 'LCD digital instrument cluster with shift light',
      compatibilityTags: ['Racing Bubble Screen', 'Footrest Kit', 'Race Decals']
    }
  },
  {
    id: 16,
    brand: 'KTM',
    model: '390 Adventure',
    priceExShowroom: '₹ 3.39 Lakh',
    engineCc: 373,
    powerBhp: 43.5,
    torqueNm: 37.0,
    weightKg: 177,
    seatHeightMm: 855,
    stockFuelEconomyKmL: 28,
    bestFor: 'ADV Dual Sport',
    imageUrl: '/bikes/adv390.svg',
    stockExhaust: 'High-mounted stainless exhaust',
    stockHandlebar: 'Tapered aluminum adventure bar',
    stockTail: 'Heavy duty tail rack unit',
    stockBraking: 'ByBre radial 4-piston caliper with Offroad ABS mode',
    deepDive: {
      transmission: '6-Speed gearbox with Quickshifter+ and Slipper Clutch',
      chassis: 'Steel trellis frame with WP APEX adjustable suspension',
      braking: '320mm front disc, 230mm rear disc with Cornering ABS',
      tyres: '100/90-19 Front, 130/80-17 Rear Metzeler Tourance Spoke',
      electricals: 'TFT display with Traction Control & Turn-by-Turn Navigation',
      compatibilityTags: ['Spoke Wheel Kit', 'Touring Windscreen', 'Radiator Guard', 'Alu Panniers']
    }
  },
  {
    id: 17,
    brand: 'KTM',
    model: '250 Adventure',
    priceExShowroom: '₹ 2.48 Lakh',
    engineCc: 248,
    powerBhp: 30.0,
    torqueNm: 24.0,
    weightKg: 177,
    seatHeightMm: 855,
    stockFuelEconomyKmL: 32,
    bestFor: 'Touring ADV',
    imageUrl: '/bikes/adv250.svg',
    stockExhaust: 'Side upswept exhaust',
    stockHandlebar: 'Wide adventure handlebar',
    stockTail: 'Pillion grab rail & luggage rack',
    stockBraking: '320mm front disc with Offroad ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Steel trellis frame with WP APEX non-adjustable forks',
      braking: '320mm front disc / 230mm rear disc',
      tyres: '100/90-19 Front, 130/80-17 Rear MRF Mogrip Meteor',
      electricals: 'LCD digital console with Offroad ABS mode',
      compatibilityTags: ['Sump Guard', 'Headlight Grille', 'Top Rack']
    }
  },

  // ==========================================
  // 3. HONDA (5 MODELS)
  // ==========================================
  {
    id: 18,
    brand: 'Honda',
    model: 'CB300R',
    priceExShowroom: '₹ 2.40 Lakh',
    engineCc: 286,
    powerBhp: 30.7,
    torqueNm: 27.5,
    weightKg: 146,
    seatHeightMm: 801,
    stockFuelEconomyKmL: 32,
    bestFor: 'Neo Retro · Cafe',
    imageUrl: '/bikes/cb300r.svg',
    stockExhaust: 'Brushed metal stubby exhaust',
    stockHandlebar: 'Flat taper handlebar',
    stockTail: 'Minimalist OEM tail unit',
    stockBraking: 'Nissin radial 4-piston caliper with IMU-based ABS',
    deepDive: {
      transmission: '6-Speed transmission with assist & slipper clutch',
      chassis: 'Pressed and tubular steel diamond frame',
      braking: '296mm hubless floating front disc, 220mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Dunlop Radial',
      electricals: 'Full LCD inverted instrument console with shift light',
      compatibilityTags: ['Belly Pan', 'Bar End Mirrors', 'Yoshimura Slip-On', 'Braided Lines']
    }
  },
  {
    id: 19,
    brand: 'Honda',
    model: "CB350 H'ness",
    priceExShowroom: '₹ 2.10 - 2.16 Lakh',
    engineCc: 348,
    powerBhp: 21.0,
    torqueNm: 30.0,
    weightKg: 181,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 35,
    bestFor: 'Modern Classic',
    imageUrl: '/bikes/cb350hness.svg',
    stockExhaust: 'Deep thumping chrome exhaust',
    stockHandlebar: 'Upright classic handlebar',
    stockTail: 'Chrome fender with round LED tail light',
    stockBraking: 'Dual channel ABS with Honda Selectable Torque Control',
    deepDive: {
      transmission: '5-Speed gearbox with assist slipper clutch',
      chassis: 'Half duplex cradle frame',
      braking: '310mm front disc, 240mm rear disc',
      tyres: '100/90-19 Front, 130/70-18 Rear Tubeless',
      electricals: 'Voice Control System with bluetooth connectivity',
      compatibilityTags: ['Scrambler Pipe', 'Custom Seat', 'LED Halo', 'Touring Screen']
    }
  },
  {
    id: 20,
    brand: 'Honda',
    model: 'CB350RS',
    priceExShowroom: '₹ 2.15 Lakh',
    engineCc: 348,
    powerBhp: 21.0,
    torqueNm: 30.0,
    weightKg: 179,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 35,
    bestFor: 'Scrambler Roadster',
    imageUrl: '/bikes/cb350rs.svg',
    stockExhaust: 'Blacked-out sports exhaust',
    stockHandlebar: 'Wide sports handlebar',
    stockTail: 'Tuck & roll seat with under-seat LED tail strip',
    stockBraking: 'Dual channel ABS with Traction Control',
    deepDive: {
      transmission: '5-Speed constant mesh gearbox',
      chassis: 'Half duplex cradle frame',
      braking: '310mm disc front, 240mm rear disc',
      tyres: '100/90-19 Front, 150/70-17 Rear Wide Block Pattern',
      electricals: 'Advanced digital-analogue instrument display',
      compatibilityTags: ['Sump Guard', 'Fork Boots', 'Slip-on Exhaust', 'Bar End Mirrors']
    }
  },
  {
    id: 21,
    brand: 'Honda',
    model: 'NX500',
    priceExShowroom: '₹ 5.90 Lakh',
    engineCc: 471,
    powerBhp: 47.0,
    torqueNm: 43.0,
    weightKg: 196,
    seatHeightMm: 830,
    stockFuelEconomyKmL: 28,
    bestFor: 'ADV Crossover',
    imageUrl: '/bikes/nx500.svg',
    stockExhaust: 'Stainless dual exit exhaust canister',
    stockHandlebar: 'Wide touring adventure bar',
    stockTail: 'Touring windscreen & tail rack',
    stockBraking: 'Dual 296mm front discs with Nissin calipers',
    deepDive: {
      transmission: '6-Speed transmission with assist & slipper clutch',
      chassis: 'Steel diamond frame with 41mm Showa SFF-BP USD forks',
      braking: 'Dual 296mm front discs, 240mm rear disc with dual ABS',
      tyres: '110/80-19 Front, 160/60-17 Rear Cast Aluminum',
      electricals: '5-inch TFT color screen with Honda RoadSync connectivity',
      compatibilityTags: ['Tall Screen', 'Knuckle Guards', 'Alu Panniers', 'Engine Crash Bars']
    }
  },
  {
    id: 22,
    brand: 'Honda',
    model: 'CBR650R',
    priceExShowroom: '₹ 9.35 Lakh',
    engineCc: 649,
    powerBhp: 87.0,
    torqueNm: 57.5,
    weightKg: 211,
    seatHeightMm: 810,
    stockFuelEconomyKmL: 20,
    bestFor: 'Inline-4 Sport',
    imageUrl: '/bikes/cbr650r.svg',
    stockExhaust: 'Compact under-engine 4-into-1 exhaust',
    stockHandlebar: 'Clip-on race bars',
    stockTail: 'Supersport sharp tail unit',
    stockBraking: 'Dual radial-mount 4-piston calipers with ABS',
    deepDive: {
      transmission: '6-Speed with Honda E-Clutch option & HSTC',
      chassis: 'Steel diamond frame with 41mm Showa SFF-BP forks',
      braking: 'Dual 310mm front discs, 240mm rear disc',
      tyres: '120/70-ZR17 Front, 180/55-ZR17 Rear',
      electricals: '5-inch TFT color screen with Honda RoadSync',
      compatibilityTags: ['Akrapovič Full System', 'Quickshifter', 'Rearsets', 'Double Bubble Screen']
    }
  },

  // ==========================================
  // 4. BAJAJ (4 MODELS)
  // ==========================================
  {
    id: 23,
    brand: 'Bajaj',
    model: 'Dominar 400',
    priceExShowroom: '₹ 2.30 Lakh',
    engineCc: 373,
    powerBhp: 40.0,
    torqueNm: 35.0,
    weightKg: 193,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 29,
    bestFor: 'Sports Tourer',
    imageUrl: '/bikes/dominar400.svg',
    stockExhaust: 'Twin barrel short canister',
    stockHandlebar: 'Upright touring handlebar',
    stockTail: 'Integrated tail unit with grab handles',
    stockBraking: 'Dual channel ABS with 320mm disc',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Beam type perimeter frame',
      braking: '320mm radial front disc, 230mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear MRF Revz C1',
      electricals: 'Split LCD console with primary and tank-mounted displays',
      compatibilityTags: ['Touring Visor', 'Top Box Rack', 'Aux Lights', 'Engine Guards']
    }
  },
  {
    id: 24,
    brand: 'Bajaj',
    model: 'Pulsar NS400Z',
    priceExShowroom: '₹ 1.85 Lakh',
    engineCc: 373,
    powerBhp: 40.0,
    torqueNm: 35.0,
    weightKg: 174,
    seatHeightMm: 807,
    stockFuelEconomyKmL: 29,
    bestFor: 'Naked Street',
    imageUrl: '/bikes/ns400z.svg',
    stockExhaust: 'Underbelly sport muffler',
    stockHandlebar: 'Wide street handlebar',
    stockTail: 'Sharp split tail unit',
    stockBraking: '320mm disc with Grimeca caliper and dual ABS',
    deepDive: {
      transmission: '6-Speed gearbox with assist & slipper clutch',
      chassis: 'Perimeter chassis frame with 43mm USD forks',
      braking: '320mm disc front, 230mm rear disc with ride modes',
      tyres: '110/70-17 Front, 140/70-17 Rear Radial',
      electricals: 'Bluetooth LCD console with Turn-by-Turn Navigation & Traction Control',
      compatibilityTags: ['ECU Remap', 'Quickshifter', 'Tail Tidy', 'Slip-on Pipe']
    }
  },
  {
    id: 25,
    brand: 'Bajaj',
    model: 'Pulsar NS200',
    priceExShowroom: '₹ 1.58 Lakh',
    engineCc: 199,
    powerBhp: 24.5,
    torqueNm: 18.7,
    weightKg: 158,
    seatHeightMm: 805,
    stockFuelEconomyKmL: 36,
    bestFor: 'Streetfighter',
    imageUrl: '/bikes/ns200.svg',
    stockExhaust: 'Underbelly exhaust note',
    stockHandlebar: 'Clip-on street handlebars',
    stockTail: 'Split LED tail lights',
    stockBraking: 'Dual channel ABS with 300mm front disc',
    deepDive: {
      transmission: '6-Speed transmission',
      chassis: 'Pressed steel perimeter frame',
      braking: '300mm front disc, 230mm rear disc',
      tyres: '100/80-17 Front, 130/70-17 Rear',
      electricals: 'Digital-analogue cluster with gear position indicator',
      compatibilityTags: ['Performance Filter', 'Crash Guard', 'Tail Tidy']
    }
  },
  {
    id: 26,
    brand: 'Bajaj',
    model: 'Pulsar N250',
    priceExShowroom: '₹ 1.51 Lakh',
    engineCc: 249,
    powerBhp: 24.5,
    torqueNm: 21.5,
    weightKg: 164,
    seatHeightMm: 795,
    stockFuelEconomyKmL: 35,
    bestFor: 'Naked Roadster',
    imageUrl: '/bikes/n250.svg',
    stockExhaust: 'Twin barrel stubby exhaust',
    stockHandlebar: 'Flat street bar',
    stockTail: 'Crystalline LED tail light',
    stockBraking: '300mm front disc with dual channel ABS & Traction Control',
    deepDive: {
      transmission: '5-Speed gearbox with assist & slipper clutch',
      chassis: 'Tubular steel frame with 37mm USD front forks',
      braking: '300mm front disc, 230mm rear disc with 3 ABS modes',
      tyres: '110/70-17 Front, 140/70-17 Rear Radial',
      electricals: 'Infinity display console with Turn-by-Turn Navigation',
      compatibilityTags: ['Slip-on Muffler', 'Crash Protectors', 'Custom Graphics']
    }
  },

  // ==========================================
  // 5. YAMAHA (3 MODELS)
  // ==========================================
  {
    id: 27,
    brand: 'Yamaha',
    model: 'MT-15 V2',
    priceExShowroom: '₹ 1.68 - 1.74 Lakh',
    engineCc: 155,
    powerBhp: 18.4,
    torqueNm: 14.1,
    weightKg: 141,
    seatHeightMm: 810,
    stockFuelEconomyKmL: 45,
    bestFor: 'Hyper Naked',
    imageUrl: '/bikes/mt15.svg',
    stockExhaust: 'Short stubby side muffler',
    stockHandlebar: 'Upright street tapered bar',
    stockTail: 'Compact LED tail light',
    stockBraking: 'Single channel ABS with 282mm disc',
    deepDive: {
      transmission: '6-Speed gearbox with VVA (Variable Valve Actuation)',
      chassis: 'Deltabox frame with aluminum swingarm',
      braking: '282mm disc front, 220mm disc rear',
      tyres: '100/80-17 Front, 140/70-R17 Rear Radial',
      electricals: 'Y-Connect LCD console with Call/SMS alerts & Traction Control',
      compatibilityTags: ['Akrapovič Slip-On', 'Quickshifter', 'Tail Tidy', 'Custom Wrap']
    }
  },
  {
    id: 28,
    brand: 'Yamaha',
    model: 'R15 V4',
    priceExShowroom: '₹ 1.82 - 1.98 Lakh',
    engineCc: 155,
    powerBhp: 18.4,
    torqueNm: 14.2,
    weightKg: 142,
    seatHeightMm: 815,
    stockFuelEconomyKmL: 43,
    bestFor: 'Super Sport',
    imageUrl: '/bikes/r15v4.svg',
    stockExhaust: 'Sport aerodynamic muffler',
    stockHandlebar: 'Aggressive race clip-ons',
    stockTail: 'Aerodynamic track cowl',
    stockBraking: 'Dual channel ABS with Traction Control System',
    deepDive: {
      transmission: '6-Speed with Quickshifter & Assist Slipper Clutch',
      chassis: 'Deltabox frame with golden USD forks',
      braking: '282mm front disc, 220mm rear disc',
      tyres: '100/80-17 Front, 140/70-R17 Rear',
      electricals: 'Track & Street mode LCD display with lap timer',
      compatibilityTags: ['Quickshifter+', 'Track Fairings', 'Brembo Master', 'Race ECU']
    }
  },
  {
    id: 29,
    brand: 'Yamaha',
    model: 'MT-03',
    priceExShowroom: '₹ 4.60 Lakh',
    engineCc: 321,
    powerBhp: 42.0,
    torqueNm: 29.5,
    weightKg: 167,
    seatHeightMm: 780,
    stockFuelEconomyKmL: 28,
    bestFor: 'Parallel-Twin Naked',
    imageUrl: '/bikes/mt03.svg',
    stockExhaust: 'Compact 2-into-1 side exhaust',
    stockHandlebar: 'Wide tapered aluminum street bar',
    stockTail: 'Sharp angled LED tail assembly',
    stockBraking: '298mm front disc with dual channel ABS',
    deepDive: {
      transmission: '6-Speed constant mesh transmission',
      chassis: 'Diamond frame with 37mm KYB inverted front forks',
      braking: '298mm floating front disc, 220mm rear disc',
      tyres: '110/70-R17 Front, 140/70-R17 Rear Tubeless',
      electricals: 'Multi-function LCD instrument panel with dual LED projector headlamps',
      compatibilityTags: ['Akrapovič Full Exhaust', 'Frame Sliders', 'Shorty Levers']
    }
  },

  // ==========================================
  // 6. TVS (3 MODELS)
  // ==========================================
  {
    id: 30,
    brand: 'TVS',
    model: 'Apache RR 310',
    priceExShowroom: '₹ 2.72 Lakh',
    engineCc: 312,
    powerBhp: 34.0,
    torqueNm: 27.3,
    weightKg: 174,
    seatHeightMm: 810,
    stockFuelEconomyKmL: 30,
    bestFor: 'Racing Sport',
    imageUrl: '/bikes/apacherr310.svg',
    stockExhaust: 'Raised stainless steel exhaust',
    stockHandlebar: 'Clip-on race bars',
    stockTail: 'Devil-horn LED tail light',
    stockBraking: 'ByBre radial caliper with 8-level ABS',
    deepDive: {
      transmission: '6-Speed gearbox with Race Tuned Slipper Clutch',
      chassis: 'Trellis frame with die-cast aluminum swingarm',
      braking: '300mm petal disc front, 240mm rear disc',
      tyres: '110/70-ZR17 Front, 150/60-ZR17 Rear Michelin Road 5',
      electricals: 'Vertical 5-inch TFT console with Race Telemetry & BTO Kits',
      compatibilityTags: ['BTO Dynamic Kit', 'Race ECU Map', 'Akrapovič Carbon', 'Quickshifter']
    }
  },
  {
    id: 31,
    brand: 'TVS',
    model: 'Apache RTR 310',
    priceExShowroom: '₹ 2.43 Lakh',
    engineCc: 312,
    powerBhp: 35.6,
    torqueNm: 28.7,
    weightKg: 169,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 30,
    bestFor: 'Streetfighter',
    imageUrl: '/bikes/apachertr310.svg',
    stockExhaust: 'Exposed streetfighter muffler',
    stockHandlebar: 'Flat aggressive handlebar',
    stockTail: 'Swingarm-mounted rear tire hugger & tail tidy',
    stockBraking: 'Cornering ABS with Rear Lift Mitigation',
    deepDive: {
      transmission: '6-Speed with Bi-Directional Quickshifter',
      chassis: 'Hyper-spec trellis frame with climate-controlled seat',
      braking: '300mm front disc, 240mm rear disc',
      tyres: '110/70-17 Front, 150/60-17 Rear Michelin Road 5',
      electricals: '5-inch TFT console with GoPro control & Tire Pressure Monitoring',
      compatibilityTags: ['Quickshifter', 'Carbon Belly Pan', 'Crash Guards']
    }
  },
  {
    id: 32,
    brand: 'TVS',
    model: 'Ronin 225',
    priceExShowroom: '₹ 1.49 - 1.73 Lakh',
    engineCc: 225,
    powerBhp: 20.4,
    torqueNm: 19.93,
    weightKg: 160,
    seatHeightMm: 795,
    stockFuelEconomyKmL: 40,
    bestFor: 'Scrambler Dual',
    imageUrl: '/bikes/ronin225.svg',
    stockExhaust: 'Blacked-out heavy note muffler',
    stockHandlebar: 'Wide scrambler handlebar',
    stockTail: 'Slim LED tail strip',
    stockBraking: 'Dual channel ABS with Rain & Urban modes',
    deepDive: {
      transmission: '5-Speed transmission with assist slipper clutch',
      chassis: 'Double cradle split chassis',
      braking: '300mm front disc, 240mm rear disc',
      tyres: '110/70-17 Front, 130/70-17 Rear Block Pattern',
      electricals: 'Asymmetrical digital speedometer with SmartXonnect',
      compatibilityTags: ['Scrambler Exhaust', 'Custom Tank Bag', 'Aux Lights', 'Bar End Mirrors']
    }
  },

  // ==========================================
  // 7. KAWASAKI (3 MODELS)
  // ==========================================
  {
    id: 33,
    brand: 'Kawasaki',
    model: 'Ninja 400',
    priceExShowroom: '₹ 5.24 Lakh',
    engineCc: 399,
    powerBhp: 45.0,
    torqueNm: 37.0,
    weightKg: 168,
    seatHeightMm: 785,
    stockFuelEconomyKmL: 26,
    bestFor: 'Sport Custom',
    imageUrl: '/bikes/ninja400.svg',
    stockExhaust: 'Right-side upswept muffler',
    stockHandlebar: 'Sport clip-ons',
    stockTail: 'Ninja LED tail light',
    stockBraking: '310mm semi-floating petal disc with Nissin ABS',
    deepDive: {
      transmission: '6-Speed transmission with Assist & Slipper clutch',
      chassis: 'Trellis high-tensile steel frame',
      braking: '310mm front disc, 220mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Dunlop Sportmax',
      electricals: 'Analogue tachometer with multi-function LCD display',
      compatibilityTags: ['Akrapovič Carbon', 'Öhlins Shock', 'Braided Lines', 'Quickshifter']
    }
  },
  {
    id: 34,
    brand: 'Kawasaki',
    model: 'Z900',
    priceExShowroom: '₹ 9.30 Lakh',
    engineCc: 948,
    powerBhp: 125.0,
    torqueNm: 98.6,
    weightKg: 212,
    seatHeightMm: 820,
    stockFuelEconomyKmL: 18,
    bestFor: 'Supernaked',
    imageUrl: '/bikes/z900.svg',
    stockExhaust: '4-into-1 inline-four header with stubby canister',
    stockHandlebar: 'Wide flat aluminum bar',
    stockTail: 'Z-pattern LED tail light',
    stockBraking: 'Dual 300mm petal discs with 4-piston calipers',
    deepDive: {
      transmission: '6-Speed gearbox with KTRC Traction Control',
      chassis: 'Trellis high-tensile steel frame',
      braking: 'Dual 300mm front discs, 250mm rear disc',
      tyres: '120/70-ZR17 Front, 180/55-ZR17 Rear Dunlop Sportmax Roadsport 2',
      electricals: 'TFT color instrumentation with Rideology App',
      compatibilityTags: ['SC-Project Conic', 'Brembo Master', 'Evotech Crash Guards', 'Stage 2 ECU']
    }
  },
  {
    id: 35,
    brand: 'Kawasaki',
    model: 'Ninja ZX-4RR',
    priceExShowroom: '₹ 9.10 Lakh',
    engineCc: 399,
    powerBhp: 77.0,
    torqueNm: 39.0,
    weightKg: 189,
    seatHeightMm: 800,
    stockFuelEconomyKmL: 22,
    bestFor: 'Screaming Inline-4',
    imageUrl: '/bikes/zx4rr.svg',
    stockExhaust: 'Side mounted upswept race muffler',
    stockHandlebar: 'Race clip-ons',
    stockTail: 'Track solo seat cowl',
    stockBraking: 'Dual 290mm radial monobloc calipers',
    deepDive: {
      transmission: '6-Speed with KQS Bi-directional Quickshifter',
      chassis: 'Trellis frame with Showa BFRC lite rear shock',
      braking: 'Dual 290mm front discs, 220mm rear disc with K-ACT ABS',
      tyres: '120/70-ZR17 Front, 160/60-ZR17 Rear Dunlop GPR-300',
      electricals: '4.3-inch TFT color meter with Circuit Mode & Rideology App',
      compatibilityTags: ['Akrapovič Full Titanium', 'Race ECU', 'Rearsets']
    }
  },

  // ==========================================
  // 8. BMW (3 MODELS)
  // ==========================================
  {
    id: 36,
    brand: 'BMW',
    model: 'G 310 R',
    priceExShowroom: '₹ 2.90 Lakh',
    engineCc: 313,
    powerBhp: 34.0,
    torqueNm: 28.0,
    weightKg: 164,
    seatHeightMm: 785,
    stockFuelEconomyKmL: 30,
    bestFor: 'Roadster',
    imageUrl: '/bikes/g310r.svg',
    stockExhaust: 'Single cylinder rearward inclined exhaust',
    stockHandlebar: 'Wide roadster handlebar',
    stockTail: 'Sleek LED rear section',
    stockBraking: 'ByBre 4-piston radial caliper with BMW Motorrad ABS',
    deepDive: {
      transmission: '6-Speed gearbox with anti-hopping clutch',
      chassis: 'Tubular space frame with bolt-on rear frame',
      braking: '300mm front disc, 240mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Michelin Pilot Street',
      electricals: 'Info-flat LCD display with Ride-by-Wire throttle',
      compatibilityTags: ['Akrapovič Slip-On', 'Adjustable Levers', 'Tail Tidy', 'LED Halo']
    }
  },
  {
    id: 37,
    brand: 'BMW',
    model: 'G 310 GS',
    priceExShowroom: '₹ 3.30 Lakh',
    engineCc: 313,
    powerBhp: 34.0,
    torqueNm: 28.0,
    weightKg: 175,
    seatHeightMm: 835,
    stockFuelEconomyKmL: 29,
    bestFor: 'Urban ADV',
    imageUrl: '/bikes/g310gs.svg',
    stockExhaust: 'High mount adventure silencer',
    stockHandlebar: 'Wide GS adventure bar',
    stockTail: 'Luggage carrier rack & beak front fender',
    stockBraking: '300mm front disc with disengageable ABS',
    deepDive: {
      transmission: '6-Speed constant mesh gearbox',
      chassis: 'Tubular steel frame with 41mm USD front forks',
      braking: '300mm front disc, 240mm rear disc',
      tyres: '110/80-R19 Front, 150/70-R17 Rear Metzeler Tourance',
      electricals: 'LCD digital instrument console with LED headlight & DRL',
      compatibilityTags: ['Touring Screen', 'Top Case Rack', 'Crash Bars', 'Aux Fog Lights']
    }
  },
  {
    id: 38,
    brand: 'BMW',
    model: 'S 1000 RR',
    priceExShowroom: '₹ 20.75 - 25.25 Lakh',
    engineCc: 999,
    powerBhp: 210.0,
    torqueNm: 113.0,
    weightKg: 197,
    seatHeightMm: 824,
    stockFuelEconomyKmL: 15,
    bestFor: 'Superbike',
    imageUrl: '/bikes/s1000rr.svg',
    stockExhaust: 'Titanium 4-into-1 race collector',
    stockHandlebar: 'Low clip-ons',
    stockTail: 'Carbon winglet integrated tail',
    stockBraking: 'M Caliper dual 320mm discs with Race ABS Pro',
    deepDive: {
      transmission: '6-Speed with Shift Assistant Pro (Bi-directional Quickshifter)',
      chassis: 'Bridge-type aluminum laminate frame',
      braking: 'Dual 320mm M Front Discs, 220mm Rear Disc',
      tyres: '120/70-ZR17 Front, 200/55-ZR17 Rear Slick Ready',
      electricals: '6.5-inch TFT screen with 4 riding modes & Dynamic Traction Control',
      compatibilityTags: ['M Carbon Wheels', 'Akrapovič Full Titanium', 'Race ECU Calibration', 'M Billet Rearsets']
    }
  },

  // ==========================================
  // 9. TRIUMPH (3 MODELS)
  // ==========================================
  {
    id: 39,
    brand: 'Triumph',
    model: 'Speed 400',
    priceExShowroom: '₹ 2.40 Lakh',
    engineCc: 398,
    powerBhp: 40.0,
    torqueNm: 37.5,
    weightKg: 176,
    seatHeightMm: 790,
    stockFuelEconomyKmL: 29,
    bestFor: 'Modern Roadster',
    imageUrl: '/bikes/speed400.svg',
    stockExhaust: 'Brushed stainless dual-skin silencer',
    stockHandlebar: 'Flat roadster handlebar',
    stockTail: 'Classic round LED tail unit',
    stockBraking: '4-piston radial caliper with Bosch dual ABS',
    deepDive: {
      transmission: '6-Speed gearbox with torque-assist clutch',
      chassis: 'Hybrid spine/perimeter tubular steel frame',
      braking: '300mm front disc, 230mm rear disc',
      tyres: '110/70-R17 Front, 150/60-R17 Rear Metzeler Sportec M9RR',
      electricals: 'Analogue speedometer with integrated multi-function LCD screen',
      compatibilityTags: ['Vance & Hines Slip-On', 'Bar End Mirrors', 'Belly Pan', 'Quilted Seat']
    }
  },
  {
    id: 40,
    brand: 'Triumph',
    model: 'Scrambler 400X',
    priceExShowroom: '₹ 2.64 Lakh',
    engineCc: 398,
    powerBhp: 40.0,
    torqueNm: 37.5,
    weightKg: 179,
    seatHeightMm: 835,
    stockFuelEconomyKmL: 28,
    bestFor: 'Scrambler · ADV',
    imageUrl: '/bikes/scrambler400x.svg',
    stockExhaust: 'High twin-pipe scrambler exhaust',
    stockHandlebar: 'Wide scrambler handlebar with crossbar',
    stockTail: 'Rugged tail tidy with headlight grille',
    stockBraking: '320mm front disc with switchable ABS',
    deepDive: {
      transmission: '6-Speed gearbox with slipper clutch',
      chassis: 'Hybrid spine/perimeter tubular steel frame',
      braking: '320mm front disc, 230mm rear disc',
      tyres: '100/90-19 Front, 140/80-17 Rear Metzeler Karoo Street',
      electricals: 'Multi-function LCD console with switchable Traction Control',
      compatibilityTags: ['High Fender', 'Aluminum Sump Guard', 'Knobby Tyres', 'Aux Lights']
    }
  },
  {
    id: 41,
    brand: 'Triumph',
    model: 'Street Triple 765 R',
    priceExShowroom: '₹ 10.17 Lakh',
    engineCc: 765,
    powerBhp: 120.0,
    torqueNm: 80.0,
    weightKg: 189,
    seatHeightMm: 826,
    stockFuelEconomyKmL: 19,
    bestFor: 'Inline-3 Supernaked',
    imageUrl: '/bikes/streettriple.svg',
    stockExhaust: 'Under-slung 3-into-1 stainless header',
    stockHandlebar: 'Tapered aluminum street handlebar',
    stockTail: 'Sharp twin bug-eye LED unit with compact tail',
    stockBraking: 'Brembo M4.32 4-piston radial monobloc calipers',
    deepDive: {
      transmission: '6-Speed with Triumph Shift Assist (Bi-directional Quickshifter)',
      chassis: 'Aluminum beam twin spar frame with gullwing swingarm',
      braking: 'Dual 310mm front discs, 220mm rear disc with Optimised Cornering ABS',
      tyres: '120/70-ZR17 Front, 180/55-ZR17 Rear Continental ContinentalRoad',
      electricals: 'Multi-function instrument cluster with TFT display & 4 riding modes',
      compatibilityTags: ['SC Project Exhaust', 'Brembo Stylema', 'Frame Protectors']
    }
  },

  // ==========================================
  // 10. HARLEY-DAVIDSON (2 MODELS)
  // ==========================================
  {
    id: 42,
    brand: 'Harley-Davidson',
    model: 'X440',
    priceExShowroom: '₹ 2.39 - 2.79 Lakh',
    engineCc: 440,
    powerBhp: 27.0,
    torqueNm: 38.0,
    weightKg: 190.5,
    seatHeightMm: 805,
    stockFuelEconomyKmL: 32,
    bestFor: 'Neo Roadster',
    imageUrl: '/bikes/x440.svg',
    stockExhaust: 'Blacked-out cruiser muffler',
    stockHandlebar: 'Flat wide handlebar',
    stockTail: 'Teardrop LED tail unit',
    stockBraking: '320mm front disc with ByBre dual-channel ABS',
    deepDive: {
      transmission: '6-Speed gearbox with assist slipper clutch',
      chassis: 'Trellis frame with steel swingarm',
      braking: '320mm front disc, 240mm rear disc',
      tyres: '100/90-18 Front, 140/70-17 Rear MRF Zapper HyKE',
      electricals: '3.5-inch TFT display with Bluetooth turn-by-turn navigation',
      compatibilityTags: ['Screamin Eagle Slip-On', 'Flat Track Bars', 'Custom Leather Seat', 'Bar End Mirrors']
    }
  },
  {
    id: 43,
    brand: 'Harley-Davidson',
    model: 'Nightster 975',
    priceExShowroom: '₹ 13.49 Lakh',
    engineCc: 975,
    powerBhp: 89.0,
    torqueNm: 95.0,
    weightKg: 221,
    seatHeightMm: 705,
    stockFuelEconomyKmL: 18,
    bestFor: 'V-Twin Sportster',
    imageUrl: '/bikes/nightster.svg',
    stockExhaust: '2-into-1 dual mufflers',
    stockHandlebar: 'Low drag handlebar',
    stockTail: 'Bobber style rear fender with side-mount license plate',
    stockBraking: 'Brembo 4-piston radial front caliper',
    deepDive: {
      transmission: '6-Speed transmission with Revolution Max 975T V-Twin engine',
      chassis: 'Trellis frame utilizing engine as stressed member',
      braking: '320mm front disc, 260mm rear disc with ABS & Traction Control',
      tyres: '100/90-19 Front, 150/80-16 Rear Dunlop Harley-Davidson Series',
      electricals: '4-inch round analogue display with LCD & Selectable Ride Modes',
      compatibilityTags: ['Screamin Eagle Air Intake', 'Forward Controls', 'Custom Exhaust']
    }
  }
];

export const PARTS_DATABASE: PartSpec[] = [
  // 1. BODY & TAIL TIDY
  {
    id: 101,
    brand: 'AutoLogue Design',
    name: 'AutoLogue Stealth Tail Tidy / Fender Eliminator',
    description: 'Cleans tail section, aircraft-grade aluminum bracket with integrated LED license plate light',
    category: 'BODY',
    priceInr: 2800,
    difficulty: 'Easy',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Meteor 350', 'CB300R', 'Duke 390', 'MT-15 V2', 'Speed 400', 'Ronin 225'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -1.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 102,
    brand: 'Woodcraft',
    name: 'Woodcraft GP Billet Clip-On Handlebars',
    description: 'Low aggressive cafe racer stance with 3-way adjustable tilt angles',
    category: 'BODY',
    priceInr: 14000,
    difficulty: 'Medium',
    compatibleBikes: ['Hunter 350', 'CB300R', 'Duke 390', 'Continental GT 650', 'Ninja 400', 'Speed 400'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.5, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 103,
    brand: 'Puig',
    name: 'Puig Dark Tint Aerodynamic Touring Windscreen',
    description: 'Reduces wind buffeting on high-speed highway cruising',
    category: 'BODY',
    priceInr: 8500,
    difficulty: 'Easy',
    compatibleBikes: ['Himalayan 452', '390 Adventure', 'NX500', 'Dominar 400', 'G 310 GS', 'Scrambler 400X'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +0.4, fuelEconomyDeltaKmL: +0.5, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 104,
    brand: 'R&G Racing',
    name: 'R&G Aerodynamic Engine Frame Sliders & Crash Protectors',
    description: 'High impact HDPE pucks preserving engine cases during low-side slides',
    category: 'BODY',
    priceInr: 11500,
    difficulty: 'Easy',
    compatibleBikes: ['Duke 390', 'Duke 250', 'RC 390', 'CB300R', 'Ninja 400', 'Z900', 'S 1000 RR', 'Street Triple 765 R'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +0.8, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 105,
    brand: 'Evotech Performance',
    name: 'Evotech Hexagonal Aluminum Radiator Guard',
    description: 'CNC machined radiator matrix protector shielding against road debris and stones',
    category: 'BODY',
    priceInr: 5800,
    difficulty: 'Easy',
    compatibleBikes: ['Duke 390', 'Himalayan 452', 'CB300R', 'Speed 400', 'Ninja 400', 'Z900', 'G 310 R'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +0.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 106,
    brand: 'Zana International',
    name: 'Zana Heavy-Duty Engine Crash Guard with Slider Pucks',
    description: 'Full perimeter tubular steel cage designed for rugged off-road protection',
    category: 'BODY',
    priceInr: 4500,
    difficulty: 'Medium',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Bullet 350', 'Meteor 350', 'Himalayan 452', 'Scrambler 400X', 'Ronin 225'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +2.8, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 107,
    brand: 'Custom-Craft',
    name: 'Custom Monocoque Single Seat Cowl Cover',
    description: 'Sleek cafe racer rear cowl replacing passenger seat',
    category: 'BODY',
    priceInr: 3900,
    difficulty: 'Easy',
    compatibleBikes: ['Continental GT 650', 'Hunter 350', 'CB350RS', 'Speed 400', 'RC 390', 'Ninja 400'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.6, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 108,
    brand: 'MotoGrafix',
    name: 'MotoGrafix 3D Resin Tank Pad & Side Grips Set',
    description: 'Scratch-resistant 3D resin tank protector with knee traction pads',
    category: 'BODY',
    priceInr: 2200,
    difficulty: 'Easy',
    compatibleBikes: ['Universal'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: 0, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },

  // 2. EXHAUST SYSTEMS
  {
    id: 109,
    brand: 'Red Rooster Performance',
    name: 'Red Rooster Performance Shorty Slip-On Muffler',
    description: 'Deeper throaty tone, free-flowing baffle, power bump with matte ceramic finish',
    category: 'EXHAUST',
    priceInr: 14500,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Meteor 350', 'Continental GT 650', "CB350 H'ness", 'X440'],
    perfImpact: { powerGainBhp: 1.6, torqueGainNm: 1.8, weightDeltaKg: -2.1, fuelEconomyDeltaKmL: -4.0, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 110,
    brand: 'Akrapovič',
    name: 'Akrapovič Carbon Full System Race Exhaust',
    description: 'Ultra lightweight titanium header pipe with carbon fiber muffler canister',
    category: 'EXHAUST',
    priceInr: 85000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['Duke 390', 'RC 390', 'Ninja 400', 'Z900', 'S 1000 RR', 'MT-15 V2', 'R15 V4', 'Apache RR 310'],
    perfImpact: { powerGainBhp: 4.8, torqueGainNm: 3.5, weightDeltaKg: -4.5, fuelEconomyDeltaKmL: -5.0, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 111,
    brand: 'Yoshimura',
    name: 'Yoshimura R-77 Carbon Slip-On Muffler',
    description: 'Japanese race engineering, trapezoidal carbon canister with removable db killer',
    category: 'EXHAUST',
    priceInr: 42000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['CB300R', 'G 310 R', 'Dominar 400', 'Ninja 400', 'Speed 400'],
    perfImpact: { powerGainBhp: 3.2, torqueGainNm: 2.8, weightDeltaKg: -3.1, fuelEconomyDeltaKmL: -3.5, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 112,
    brand: 'S&S Cycle',
    name: 'S&S Qualifier Twin Chrome Slip-On Mufflers',
    description: 'Deep rumble exhaust note tuned specifically for 650 Parallel Twin engines',
    category: 'EXHAUST',
    priceInr: 48000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['Continental GT 650', 'Interceptor 650', 'Shotgun 650', 'Super Meteor 650'],
    perfImpact: { powerGainBhp: 3.5, torqueGainNm: 3.2, weightDeltaKg: -5.2, fuelEconomyDeltaKmL: -3.0, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 113,
    brand: 'SC-Project',
    name: 'SC-Project CRT Titanium Slip-On Silencer',
    description: 'MotoGP derived titanium muffler with aggressive high-decibel acoustic roar',
    category: 'EXHAUST',
    priceInr: 62000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['Duke 390', 'Street Triple 765 R', 'Z900', 'S 1000 RR', 'CBR650R'],
    perfImpact: { powerGainBhp: 4.2, torqueGainNm: 3.0, weightDeltaKg: -3.8, fuelEconomyDeltaKmL: -4.5, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 114,
    brand: 'Austin Racing',
    name: 'Austin Racing GP1R Titanium Slip-On',
    description: 'Handcrafted titanium tail pipe with laser-etched logo for pure track noise',
    category: 'EXHAUST',
    priceInr: 72000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['S 1000 RR', 'Street Triple 765 R', 'Z900', 'Ninja ZX-4RR'],
    perfImpact: { powerGainBhp: 5.1, torqueGainNm: 3.8, weightDeltaKg: -4.1, fuelEconomyDeltaKmL: -5.0, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 115,
    brand: 'Gursewak Exhausts',
    name: 'Gursewak Straight-Pipe Twin Chrome Slip-On',
    description: 'Classic loud thumper acoustic note for RE 350cc single cylinder engines',
    category: 'EXHAUST',
    priceInr: 6800,
    difficulty: 'Medium',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Bullet 350', 'Meteor 350'],
    perfImpact: { powerGainBhp: 1.0, torqueGainNm: 1.2, weightDeltaKg: -1.8, fuelEconomyDeltaKmL: -2.5, heatIncrease: true, ecuRemapRequired: false }
  },

  // 3. HEADLIGHTS, TAIL LIGHTS & LIGHTING
  {
    id: 116,
    brand: 'Motogadget',
    name: 'Motogadget Lumen 5.75" 6000K LED Halo Projector',
    description: 'High intensity H4 plug-and-play projector with DRL ring and die-cast black housing',
    category: 'LIGHTS',
    priceInr: 3500,
    difficulty: 'Easy',
    compatibleBikes: ['Classic 350', 'Hunter 350', 'Continental GT 650', "CB350 H'ness", 'X440', 'Universal'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.3, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 117,
    brand: 'Koso',
    name: 'Koso Thunderbolt Ultra-Slim Full LED Headlight Unit',
    description: 'Futuristic streetfighter horizontal LED projector lens with aluminum heat sink',
    category: 'LIGHTS',
    priceInr: 18500,
    difficulty: 'Medium',
    compatibleBikes: ['Duke 390', 'Duke 250', 'CB300R', 'MT-15 V2', 'Speed 400', 'Guerrilla 450'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.4, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 118,
    brand: 'Kellermann',
    name: 'Kellermann Bullet 1000 3-in-1 Micro LED Tail Light & Indicators',
    description: 'Ultra compact German engineered tail lamp, brake light & indicator all in one housing',
    category: 'LIGHTS',
    priceInr: 12500,
    difficulty: 'Easy',
    compatibleBikes: ['Universal'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 119,
    brand: 'Denali Electronics',
    name: 'Denali D4 Tri-Optic LED Auxiliary Fog Light Pods Kit',
    description: '8760 lumens high intensity spot & flood auxiliary beam driving lamps for night touring',
    category: 'LIGHTS',
    priceInr: 38000,
    difficulty: 'Medium',
    compatibleBikes: ['Himalayan 452', '390 Adventure', 'NX500', 'G 310 GS', 'Scrambler 400X', 'Dominar 400'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +1.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 120,
    brand: 'AutoLogue Design',
    name: 'AutoLogue Smoke LED Strip Tail Light with Sequential Indicators',
    description: 'Tucked smoked lens rear tail light bar with integrated dynamic sweeping blinkers',
    category: 'LIGHTS',
    priceInr: 4200,
    difficulty: 'Easy',
    compatibleBikes: ['Hunter 350', 'Continental GT 650', 'CB350RS', 'Pulsar NS200', 'Ronin 225'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.3, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 121,
    brand: 'Rigid Industries',
    name: 'Rigid Igniter Compact Amber LED Fog Pods',
    description: 'Penetrating yellow amber fog beam for heavy rain and mountain mist visibility',
    category: 'LIGHTS',
    priceInr: 14500,
    difficulty: 'Easy',
    compatibleBikes: ['Himalayan 452', '390 Adventure', 'Scrambler 400X', 'Universal'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: +0.6, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },

  // 4. ECU, ENGINE & ELECTRONICS
  {
    id: 122,
    brand: 'Powertronic',
    name: 'Powertronic Stage-1 Piggyback ECU Tuner',
    description: 'Dual-map ignition & fuel control module optimizing throttle response and peak power',
    category: 'ENGINE',
    priceInr: 18500,
    difficulty: 'Medium',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Duke 390', 'Dominar 400', 'Continental GT 650', 'Speed 400', 'Apache RR 310'],
    perfImpact: { powerGainBhp: 2.4, torqueGainNm: 2.6, weightDeltaKg: 0, fuelEconomyDeltaKmL: -2.0, heatIncrease: true, ecuRemapRequired: true }
  },
  {
    id: 123,
    brand: 'BMC Filters',
    name: 'BMC High-Performance Cotton Washable Air Filter',
    description: '40% higher airflow rate over OEM paper filters with oiled cotton mesh',
    category: 'ENGINE',
    priceInr: 6500,
    difficulty: 'Easy',
    compatibleBikes: ['Universal'],
    perfImpact: { powerGainBhp: 0.8, torqueGainNm: 0.6, weightDeltaKg: -0.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 124,
    brand: 'HealTech',
    name: 'HealTech Quickshifter Easy (QSE) iQSE-1',
    description: 'Seamless clutchless full-throttle upshifts configurable via Bluetooth smartphone app',
    category: 'ENGINE',
    priceInr: 29500,
    difficulty: 'Medium',
    compatibleBikes: ['Duke 390', 'Continental GT 650', 'Ninja 400', 'CB300R', 'Speed 400', 'Z900'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.1, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 125,
    brand: 'DNA Air Filters',
    name: 'DNA Stage-2 Air Filter Box Cover & Filter Combo',
    description: 'Opens intake chamber volume for aggressive high RPM engine breathing',
    category: 'ENGINE',
    priceInr: 11000,
    difficulty: 'Easy',
    compatibleBikes: ['Duke 390', 'Himalayan 452', '390 Adventure', 'Continental GT 650'],
    perfImpact: { powerGainBhp: 1.5, torqueGainNm: 1.2, weightDeltaKg: -0.3, fuelEconomyDeltaKmL: -1.5, heatIncrease: false, ecuRemapRequired: true }
  },

  // 5. SUSPENSION & HANDLING
  {
    id: 126,
    brand: 'Öhlins',
    name: 'Öhlins NIX 22 Cartridge Fork Kit',
    description: 'Fully adjustable compression and rebound damping cartridge kit for front suspension',
    category: 'SUSP.',
    priceInr: 95000,
    difficulty: 'Hard / Expert',
    compatibleBikes: ['Continental GT 650', 'Duke 390', 'Ninja 400', 'Z900', 'S 1000 RR'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -1.2, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 127,
    brand: 'YSS Suspension',
    name: 'YSS G-Top Gas Monoshock Absorber',
    description: 'Preload + 30-click rebound adjustment with remote piggyback gas reservoir',
    category: 'SUSP.',
    priceInr: 28000,
    difficulty: 'Medium',
    compatibleBikes: ['Hunter 350', 'Classic 350', 'Meteor 350', 'Dominar 400', 'G 310 R', 'Ronin 225'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.8, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 128,
    brand: 'Hyperpro',
    name: 'Hyperpro Progressive Front Fork Springs Set',
    description: 'Prevents nose-diving under heavy braking while absorbing harsh road bumps',
    category: 'SUSP.',
    priceInr: 16500,
    difficulty: 'Medium',
    compatibleBikes: ['Himalayan 452', '390 Adventure', 'Interceptor 650', 'CB350 H\'ness'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: 0, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },

  // 6. BRAKES & CONTROLS
  {
    id: 129,
    brand: 'Brembo',
    name: 'Brembo RCS 19 Corsa Corta Radial Master Cylinder',
    description: 'Adjustable bite point & lever ratio for unmatched track brake modulation',
    category: 'BRAKES',
    priceInr: 34000,
    difficulty: 'Medium',
    compatibleBikes: ['Continental GT 650', 'Duke 390', 'RC 390', 'Z900', 'S 1000 RR', 'Ninja 400'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.4, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  },
  {
    id: 130,
    brand: 'HEL Performance',
    name: 'HEL Performance Steel Braided Brake Lines Set',
    description: 'High pressure stainless steel line set eliminating spongy brake lever feel',
    category: 'BRAKES',
    priceInr: 7500,
    difficulty: 'Medium',
    compatibleBikes: ['Universal'],
    perfImpact: { powerGainBhp: 0, torqueGainNm: 0, weightDeltaKg: -0.1, fuelEconomyDeltaKmL: 0, heatIncrease: false, ecuRemapRequired: false }
  }
];

export const FEATURED_BUILDS: FeaturedBuild[] = [
  {
    id: 1,
    title: 'Cafe Racer AI Plan',
    style: 'Cafe Racer',
    baseBike: 'Hunter 350',
    costInr: 31300,
    isFeatured: true,
    imageUrl: '/bikes/hunter350.svg',
    prompt: 'Aggressive low stance cafe racer with clip-ons, tail tidy, slip-on exhaust and Powertronic ECU tune.',
    partsList: ['AutoLogue Fender Eliminator', 'Woodcraft Clip-On Handlebars', 'Red Rooster Slip-On', 'Powertronic Stage 1 ECU'],
    likes: 142,
    commentsCount: 19,
    author: 'Aarav Sharma',
    authorAge: 26,
    authorPhone: '+91 98201 44512'
  },
  {
    id: 2,
    title: 'Apex Predator 390',
    style: 'Streetfighter',
    baseBike: 'Duke 390',
    costInr: 131500,
    isFeatured: true,
    imageUrl: '/bikes/duke390.svg',
    prompt: 'Track ready streetfighter with Akrapovič titanium exhaust, Öhlins cartridge forks and Brembo radial master cylinder.',
    partsList: ['Akrapovič Carbon Full System', 'Öhlins NIX 22 Cartridge Kit', 'Brembo RCS 19 Corsa Corta'],
    likes: 210,
    commentsCount: 34,
    author: 'Kabir Verma',
    authorAge: 24,
    authorPhone: '+91 98765 43210'
  },
  {
    id: 3,
    title: 'Continental GT Silver Stealth',
    style: 'Cafe Racer',
    baseBike: 'Continental GT 650',
    costInr: 161500,
    isFeatured: false,
    imageUrl: '/bikes/gt650.svg',
    prompt: 'Twin cylinder aggressive cafe racer with Red Rooster twin exhaust and Öhlins suspension.',
    partsList: ['Red Rooster Slip-On', 'Öhlins NIX 22 Cartridge Kit', 'Brembo RCS 19 Master Cylinder'],
    likes: 178,
    commentsCount: 22,
    author: 'Rohan Mehta',
    authorAge: 31,
    authorPhone: '+91 99302 77123'
  },
  {
    id: 4,
    title: 'Urban Speed 400 Roadster',
    style: 'Roadster',
    baseBike: 'Speed 400',
    costInr: 39300,
    isFeatured: false,
    imageUrl: '/bikes/speed400.svg',
    prompt: 'Triumph 400 roadster with Powertronic ECU tune, Yoshimura muffler and bar end mirrors.',
    partsList: ['Yoshimura R-77 Slip-On', 'Powertronic ECU', 'AutoLogue Tail Tidy'],
    likes: 115,
    commentsCount: 14,
    author: 'Vikramaditya Roy',
    authorAge: 29,
    authorPhone: '+91 98112 00981'
  },
  {
    id: 5,
    title: 'Hyper Naked MT-15 Track Spec',
    style: 'Hyper Naked',
    baseBike: 'MT-15 V2',
    costInr: 97800,
    isFeatured: false,
    imageUrl: '/bikes/mt15.svg',
    prompt: 'Lightweight hyper naked track build with Akrapovič carbon exhaust and HEL braided brake lines.',
    partsList: ['Akrapovič Carbon Full System', 'HEL Braided Brake Lines', 'AutoLogue Tail Tidy'],
    likes: 95,
    commentsCount: 9,
    author: 'Devansh Joshi',
    authorAge: 27,
    authorPhone: '+91 98451 66209'
  }
];

export const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 1,
    providerType: 'Custom Shop',
    name: 'Iron & Bone Customs',
    location: 'Bandra West, Mumbai',
    distKm: 3.4,
    starRating: 4.9,
    specialties: ['Full teardowns', 'Custom frame fabrication', 'High-end paint & airbrush', 'Cafe Racer builds'],
    phone: '+91 98200 11223'
  },
  {
    id: 2,
    providerType: 'Custom Shop',
    name: 'Velocity Garage Works',
    location: 'Indiranagar, Bengaluru',
    distKm: 5.2,
    starRating: 4.8,
    specialties: ['Engine rebuilds', 'Dyno tuning', 'Exhaust headers', 'Track prep'],
    phone: '+91 98450 33445'
  },
  {
    id: 3,
    providerType: 'Verified Mechanic',
    name: 'Apex Moto Tech (Ramesh)',
    location: 'Andheri East, Mumbai',
    distKm: 2.1,
    starRating: 4.9,
    specialties: ['Bolt-on equipment installation', 'Brake line bleeding', 'Suspension setup'],
    phone: '+91 98190 55667'
  },
  {
    id: 4,
    providerType: 'Verified Mechanic',
    name: 'Pro-Tune Remap Hub',
    location: 'Koramangala, Bengaluru',
    distKm: 6.8,
    starRating: 4.7,
    specialties: ['ECU tuning & remapping', 'Fuel injection mapping', 'Electrical upgrades'],
    phone: '+91 98800 77889'
  }
];
