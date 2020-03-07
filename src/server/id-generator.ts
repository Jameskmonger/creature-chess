import uuid = require("uuid/v4");

export class IdGenerator {
    private claimedIds: string[] = [];

    public generateId() {
        while (true) {
            const id = uuid().substring(0, 6);

            // if it's not in the claimed list, return it - otherwise continue
            if (this.claimedIds.indexOf(id) === -1) {
                this.claimedIds.push(id);
                return id;
            }
        }
    }

    public releaseId(id: string) {
        const index = this.claimedIds.indexOf(id);

        if (index === -1) {
            return;
        }

        this.claimedIds.splice(index, 1);
    }
}
