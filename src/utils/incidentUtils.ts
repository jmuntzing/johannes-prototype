
export const isUtsattesFor = (value: string): boolean => {
  const utsattesForIncidents = [
    'digitala trakasserier', 'elaka kommentarer', 'fysiska hot', 'förolämpningar',
    'förlöjliganden', 'knuffar', 'nedsättande ord', 'psykosocial utfrysning',
    'rasistiska uttryck', 'ryktesspridning', 'slag', 'sparkar',
    'spridning av kränkande material', 'social exkludering', 'verbala hot'
  ];
  return utsattesForIncidents.includes(value);
};

export const getIncidentDisplay = (value: string): string => {
  if (!value) return '';
  return value;
};
