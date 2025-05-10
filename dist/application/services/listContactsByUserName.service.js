"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListContactsByUserNameService = void 0;
class ListContactsByUserNameService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async execute(userName) {
        return this.contactRepository.findByUserName(userName);
    }
}
exports.ListContactsByUserNameService = ListContactsByUserNameService;
//# sourceMappingURL=listContactsByUserName.service.js.map