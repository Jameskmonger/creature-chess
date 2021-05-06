export enum PlayerTitle  {
    Developer = 1,
    Contributor = 2,
    HallOfFame = 3,
    MasterOfTitles = 4
}

export const TITLES = {
    [PlayerTitle.Developer]: { className: "developer-001", text: "Developer" },
    [PlayerTitle.Contributor]: { className: "contributor-001", text: "Contributor" },
    [PlayerTitle.HallOfFame]: { className: "hall-of-fame-001", text: "Hall of Fame" },
    [PlayerTitle.MasterOfTitles]: {className : "master-of-titles-001", text: "Master of Titles"}
};
/*
export const PLAYER_TITLES: { [playerId: string]: { className: string, text: string } } = {
    "276389458988761607": TITLES.DEVELOPER, // jkm
    "289896988988670470": TITLES.CONTRIBUTOR, // smoolie
    "295493134844953090": TITLES.CONTRIBUTOR, // thebigcheese
    "295122232268554758": TITLES.CONTRIBUTOR, // acetomman
    "276850371065807367": TITLES.HALL_OF_FAME // huwbear
};
*/
