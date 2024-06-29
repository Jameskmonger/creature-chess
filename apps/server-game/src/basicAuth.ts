import { Request, Response, NextFunction } from "express";

export function basicAuth(username: string, password: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const auth = req.headers.authorization;
		if (!auth) {
			return res.status(401);
		}

		const [type, encoded] = auth.split(" ");
		if (type !== "Basic") {
			return res.status(401);
		}

		const decoded = Buffer.from(encoded, "base64").toString();
		const [user, pass] = decoded.split(":");

		if (user === username && pass === password) {
			return next();
		}

		return res.status(401);
	};
}
