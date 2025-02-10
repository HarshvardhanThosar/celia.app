export const MIN_TASK_DESCRIPTION_LENGTH = 0;
export const MAX_TASK_DESCRIPTION_LENGTH = 500;

function createRange(start: number, end: number) {
  if (typeof start !== "number" || typeof end !== "number") {
    throw new Error("Both start and end must be numbers.");
  }

  const step = start <= end ? 1 : -1;
  const range = [];

  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    range.push({
      name: `${i}`,
      value: `${i}`,
    });
  }
  return range;
}

export const MIN_NUMBER_OF_PARTICIPANTS = 1;
export const MAX_NUMBER_OF_PARTICIPANTS = 4;
export const NUMBER_OF_PARTICIPANTS_OPTIONS = createRange(
  MIN_NUMBER_OF_PARTICIPANTS,
  MAX_NUMBER_OF_PARTICIPANTS
);

export const MIN_HOURS_OPTIONS = 1;
export const MAX_HOURS_OPTIONS = 6;
export const HOURS_OPTIONS = createRange(MIN_HOURS_OPTIONS, MAX_HOURS_OPTIONS);

export const CATEGORY_MASTER = [
  {
    name: "Academic Tasks",
    value: "academic_tasks",
  },
  {
    name: "Professional Tasks",
    value: "professional_tasks",
  },
  {
    name: "Household Tasks",
    value: "household_tasks",
  },
  {
    name: "Health and Wellness Tasks",
    value: "health_and_wellness_tasks",
  },
  {
    name: "Creative Tasks",
    value: "creative_tasks",
  },
  {
    name: "Financial Tasks",
    value: "financial_tasks",
  },
  {
    name: "Social and Relationship Tasks",
    value: "social_and_relationship_tasks",
  },
  {
    name: "Personal Development Tasks",
    value: "personal_development_tasks",
  },
  {
    name: "Recreational Tasks",
    value: "recreational_tasks",
  },
  {
    name: "Environmental and Sustainability Tasks",
    value: "environmental_and_sustainability_tasks",
  },
  {
    name: "Community and Volunteering Tasks",
    value: "community_and_volunteering_tasks",
  },
  {
    name: "Technology and IT Tasks",
    value: "technology_and_it_tasks",
  },
  {
    name: "Travel and Exploration Tasks",
    value: "travel_and_exploration_tasks",
  },
  {
    name: "Shopping and Errands Tasks",
    value: "shopping_and_errands_tasks",
  },
  {
    name: "Emergency Preparedness Tasks",
    value: "emergency_preparedness_tasks",
  },
];
