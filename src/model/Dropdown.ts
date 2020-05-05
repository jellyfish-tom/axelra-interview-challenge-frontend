export interface DropdownItem {
  value: number;
  label: string;
}

export const POSSIBLE_TODO_DROPDOWN_STATES: DropdownItem[] = [
  { value: 0, label: "To Do" },
  { value: 1, label: "Done" },
  // { value: 2, label: "Test" },
  // { value: 3, label: "Yet another" },
];

export const NEUTRAL_TODO_DROPDOWN_STATE: DropdownItem = {
  value: -1,
  label: "Pick state",
};
