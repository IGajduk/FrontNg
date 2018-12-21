export class Product{

  constructor(
    public _id: string = '',
    public title: string = '',
    public price: string = '',
    public about_all: string = '',
    public about_short: string = '',
    public colors: any[] = [],
    public photos: any[] = [],
    public quantity: string = '',
    public date: string = '',
    public gender: string = '',
    public category: string = '',
    public producer: string = '',
    public show: string = '',
    public sale: string = '',
  ){
  }
}
