export class UnitCardModel {
  
  constructor(
    public name: number,
    public experience: number,
    public unitType: number,
    public role: number,
    public cost: number,
    public altRoles: number[],
    public traits: number[],
  ) {}
}