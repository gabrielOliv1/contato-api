import { IContactRepository } from "src/domain/repositories/contact.repository";

export class DeleteContactService {
    constructor(private readonly contactRepository: IContactRepository) {}

    async execute(telefone_celular: string): Promise<void> {
        const contact = await this.contactRepository.findByTelefoneCelular(telefone_celular)

        if (!contact) {
            throw new Error('contact not found')
        }

        await this.contactRepository.delete(telefone_celular)
    }
}