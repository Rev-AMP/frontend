export class AdminPermissions {
    BITS_VALUE = {
        user: "CRUD operations on users",
        admin: "CRUD operations on admins",
        school: "CRUD operations on schools",
        year: "CRUD operations on years",
        term: "CRUD operations on terms",
        course: "CRUD operations on courses",
        student: "CRUD operations on students",
        professor: "CRUD operations on professors",
    };

    bitNames = {
        user: 0,
        admin: 1,
        school: 2,
        year: 3,
        term: 4,
        course: 5,
        student: 6,
        professor: 7,
    };

    constructor(permissions) {
        this.permissions = permissions;
    }

    get = (key) => {
        // for superusers
        if (this.permissions < 0) return true;
        // for admins
        return !!(this.permissions & (2 ** this.bitNames[key]));
    };

    set = (key, val) => {
        // make sure you don't change permissions of superusers
        if (this.permissions >= 0) {
            const bitNo = this.bitNames[key];
            if (val) {
                this.permissions |= 2 ** bitNo;
            } else {
                this.permissions &= ~(2 ** bitNo);
            }
        }
    };

    reset = () => (this.permissions = 0);

    isAllowed = (permission) =>
        !!(this.permissions < 0 || (this.bitNames.hasOwnProperty(permission) && this.get(permission)));
}
