// todo tune this
export const getCooldownForSpeed = (speed: number) =>
	Math.ceil((180 - speed) / 24);
