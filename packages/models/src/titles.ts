export enum PlayerTitle  {
    Developer = 1,
    Contributor = 2,
    HallOfFame = 3
}

export const TITLES = {
    [PlayerTitle.Developer]: { className: "developer-001", text: "Developer" },
    [PlayerTitle.Contributor]: { className: "contributor-001", text: "Contributor" },
    [PlayerTitle.HallOfFame]: { className: "hall-of-fame-001", text: "Hall of Fame" },
};
