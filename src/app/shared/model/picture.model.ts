export class Picture {
  constructor(
    public title: string,
    public artist: string,
    public category: string,
    public imageURL: string,
    public price: string,
    public description: string,
    public edited?: boolean,
    public id?: string,
  ) {}
}
