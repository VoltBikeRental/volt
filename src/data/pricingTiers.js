const pricingTiers = {
  "Electric city bike": [
    { maxHours: 1, price: 10 },
    { maxHours: 2, price: 18 },
    { maxHours: 4, price: 25 },
    { maxHours: 10.5, price: 30 }, // 1 day (9:30 to 20:00)
    { maxHours: 24, price: 35 }, // 24 hours (full day)
    { maxHours: 48, price: 58 }, // 2 days
    { maxHours: 72, price: 84 }, // 3 days
    { maxHours: 96, price: 110 }, // 4 days
    { maxHours: 120, price: 135 }, // 5 days
    { maxHours: 144, price: 159 }, // 6 days
    { maxHours: 168, price: 170 }, // 1 week
  ],
  "City bike 28": [
    { maxHours: 2, price: 7 },
    { maxHours: 4, price: 10 },
    { maxHours: 10.5, price: 12 }, // 1 day (9:30 to 20:00)
    { maxHours: 24, price: 14 }, // 24 hours (full day)
    { maxHours: 48, price: 24 }, // 2 days
    { maxHours: 72, price: 34 }, // 3 days
    { maxHours: 96, price: 44 }, // 4 days
    { maxHours: 120, price: 54 }, // 5 days
    { maxHours: 144, price: 63 }, // 6 days
    { maxHours: 168, price: 65 }, // 1 week
  ],
  "City bike for kids": [
    { maxHours: 2, price: 7 },
    { maxHours: 4, price: 10 },
    { maxHours: 10.5, price: 12 }, // 1 day (9:30 to 20:00)
    { maxHours: 24, price: 14 }, // 24 hours (full day)
    { maxHours: 48, price: 24 }, // 2 days
    { maxHours: 72, price: 34 }, // 3 days
    { maxHours: 96, price: 44 }, // 4 days
    { maxHours: 120, price: 54 }, // 5 days
    { maxHours: 144, price: 63 }, // 6 days
    { maxHours: 168, price: 65 }, // 1 week
  ],
  "E-scooter Up to 30km": [
    { maxHours: 1, price: 7 },
    { maxHours: 2, price: 12 },
    { maxHours: 4, price: 22 },
    { maxHours: 10.5, price: 25 }, // 1 day (9:30 to 20:00)
    { maxHours: 24, price: 30 }, // 24 hours (full day)
    { maxHours: 48, price: 42 }, // 2 days
    { maxHours: 168, price: 122 }, // 1 week
  ],
  "E-scooter Up to 60km": [
    { maxHours: 1, price: 9 },
    { maxHours: 2, price: 14 },
    { maxHours: 4, price: 24 },
    { maxHours: 10.5, price: 27 }, // 1 day (9:30 to 20:00)
    { maxHours: 24, price: 32 }, // 24 hours (full day)
    { maxHours: 48, price: 44 }, // 2 days
    { maxHours: 168, price: 124 }, // 1 week
  ],
  Helmet: { pricePerDay: 1 }, // 1€ per day, rounded up
  "Child seat": { pricePerDay: 5 }, // 5€ per day, rounded up
  Backpack: { fixedPrice: 1 },
  // Default for items not listed
  DEFAULT: { fixedPrice: 10 }, // Default price per item if not in tiers
}

export default pricingTiers;
