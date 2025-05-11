import { useLocalStorage } from "@uidotdev/usehooks";

interface AppSettings {
	showPing: boolean;
}

const defaultSettings: AppSettings = {
	showPing: false,
};

export function useSetting(key: keyof AppSettings): AppSettings[typeof key] {
	const [settings] = useLocalStorage<AppSettings>("settings", defaultSettings);

	return settings[key];
}

export function useSettings(): AppSettings {
	const [settings] = useLocalStorage<AppSettings>("settings", defaultSettings);

	return settings;
}

export function useSetSetting(
	key: keyof AppSettings
): (value: AppSettings[typeof key]) => void {
	const [, setSettings] = useLocalStorage<AppSettings>(
		"settings",
		defaultSettings
	);

	return (value: AppSettings[typeof key]) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};
}
