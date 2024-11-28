
interface SettingsValues {
  CORE_API_URI: string;
}

export class Settings {
  private static instance: Settings;
  readonly CORE_API_URI: string;

  constructor() {
    const { CORE_API_URI } = Settings.getSettingsValues();

    this.CORE_API_URI = CORE_API_URI;

    console.info('App Initialized with Settings:')
    console.info({
      CORE_API_URI
    })
  }

  private static getSettingsValues(): SettingsValues {
    return {
      CORE_API_URI: process.env.NEXT_PUBLIC_CORE_API_URI || ""
    }
  }

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings()
    }

    return Settings.instance
  }
}
