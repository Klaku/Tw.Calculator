export interface Unit {
  build_time: string[];
  pop: string[];
  speed: string[];
  attack: string[];
  defense: string[];
  defense_cavalry: string[];
  defense_archer: string[];
  carry: string[];
}

export const InitialConfig: ConfigObject = {
  config: {
    spear: [],
    sword: [],
    axe: [],
    spy: [],
    light: [],
    heavy: [],
    ram: [],
    catapult: [],
    knight: [],
    snob: [],
  },
};

export interface Config {
  [key: string]: Unit[];
}

export interface ConfigObject {
  config: Config;
}
