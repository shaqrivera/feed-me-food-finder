export class RestaurantCategory {
    constructor(private readonly alias: string, private readonly title: string){}

    static create(alias: string, title: string) {
        return new RestaurantCategory(alias, title)
    }

    static restore(data: any) {
        return new RestaurantCategory(data.alias, data.title)
    }
}
