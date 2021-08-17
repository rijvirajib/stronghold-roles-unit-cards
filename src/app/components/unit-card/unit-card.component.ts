import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.scss']
})

export class UnitCardComponent implements OnInit {
  name = ''
  commander = ''
  attack = 0
  defense = 0
  power = 0
  toughness = 0
  morale = 0
  role = ''
  cost = 0
  training = []
  traits = []
  typeFlag = '/assets/flags/type/levies.png'
  emptyRow = ['', 0, 0, 0, 0, 0]
  roleOverride = ''
  cardColor = '#b33320'

  unitExperiences = [
    ['Green', 0, 0, 0, 0, 0],
    ['Regular', 1, 0, 1, 0, 1],
    ['Seasoned', 1, 0, 1, 0, 1],
    ['Veteran', 2, 0, 2, 0, 3],
    ['Elite', 2, 0, 2, 0, 4],
    ['Super-Elite', 3, 0, 3, 0, 5]
  ]
  selectedExperience: any[] = this.unitExperiences[0]

  unitEquipment = [
    ['', 0, 0, 0, 0, 0],
    ['Light', 0, 1, 0, 1, 0],
    ['Medium', 0, 2, 0, 2, 0],
    ['Heavy', 0, 4, 0, 4, 0],
    ['Super-Heavy', 0, 6, 0, 6, 0]
  ]
  selectedEquipment = this.unitEquipment[0]

  // Name, Attack, Power, Defense, Toughness, Morale, Cost Modifier, Extra Trait, Trait Description
  unitTypes = [
    ['Aerial', 0, 0, 0, 0, 3, 2],
    ['Archer', 0, 1, 0, 0, 1, 1.75],
    ['Cavalry', 1, 1, 0, 0, 2, 1.5, 'Charge', 'Cannot use while engaged. A Charge is an attack with advantage on the Attack check. It inflicts 2 casualties on a successful Power check.The charging unit is then engaged with the defending unit and must make a DC 13 Morale check to disengage.'],
    ['Levies', 0, 0, 0, 0, 1, .75, 'Always diminished', 'This unit is always diminished',],
    ['Infantry', 0, 0, 1, 1, 0, 1],
    ['Siege Engine', 1, 1, 0, 1, 0, 1.5, 'Siege Engine', 'This unit can attack fortifications, dealing 1d6 damage on a hit.'],
  ]
  selectedUnitType: any[] = this.unitTypes[3]

  unitRoles = [
    ['', 0, 0, 0, 0, 0, ''],
    ['Controllers', 0, 0, 1, -1, 1, 'Enemies have a -1 to their Morale check against this unit.'],
    ['Defenders', 0, -1, 2, 2, 2, 'This unit has advantage on morale checks to rally.'],
    ['Lurkers', 3, 3, 0, -2, -1, 'This unit has advantage on the first attack them make in battle.'],
    ['Scouts', 2, -1, 1, 0, 0, 'When deployed alone, this unit can relay d3 peices information about an enemy unit or stronghold (number of units, unit equipment, unit size, stronghold level, etc).'],
    ['Snipers', 3, 1, 0, -1, -1, 'This unit can be ordered to aim granting them a 1d4 bonus to their next attack and power rolls. On a successful Power check, this unit inflicts 2 casualties instead of 1 and if both d4 rolls are 4, the enemy takes 3 casualties.'],
    ['Strikers', 2, 2, -1, 0, 0, 'This unit engages when they attack an enemy unit.'],
    ['Supporters', -1, 0, 0, 0, 2, 'This unit has a +1 to their first Morale check in combat.'],
  ]
  selectedRole = this.unitRoles[0]

  unitSizes = [
    [4, .66],
    [6, 1],
    [8, 1.33],
    [10, 1.66],
    [12, 2],
    [20, 3.33]
  ]
  selectedSize = this.unitSizes[1]

  trainingTraits = [
    ['Weak', 0, -1, 0, -1, 0, 'This unit is weak.'],
    ['Standard', 1, 0, 0, 0, 1, 'This unit is up to standards.'],
    ['Strong', 1, 1, 1, 0, 1, 'This unit is strong. They hit harder, and have more morale.'],
    ['War-Born', 2, 2, 1, 1, 1, 'This unit cannot be diminished, and cannot have disadvantage on Morale checks.', 100],
    ['Offensive', 1, 1, 0, -1, 0, 'This unit gives up a little defense for offense.'],
    ['Brutal', 2, 2, 0, -2, 0, 'This unit inflicts 2 casualties on a successful Power check.', 200],
    ['Defensive', 0, -1, 1, 1, 0, 'This unit focuses on defense instead of offense.'],
    ['Tankie', 0, -2, 2, 2, 1, 'This unit tries to tank as much as possible.']
  ]

  availableTraits = [
    ['Amphibious', 'This unit does not suffer terrain penalties for fighting in water or on land.', 50],
    ['Courageous', 'Once per battle, this unit can choose to succeed on a Morale check it just failed.', 50],
    ['Eternal', 'This unit cannot be horrified, and it always succeeds on Morale checks to attack undead and fiends.', 50],
    ['Frenzy', 'If this unit diminishes an enemy unit, it immediately makes a free attack against that unit.', 50],
    ['Horrify', 'If this unit inflicts a casualty on an enemy unit, that unit must make a DC 15 Morale check. Failure exhausts the unit.', 200],
    ['Martial', 'If this unit succeeds on a Power check and its size is greater than the defending unit, it inflicts 2 casualties.', 100],
    ['Mindless', 'This unit cannot fail Morale checks.', 100],
    ['Regenerate', 'When this unit refreshes, increment its casualty die. This trait ceases to function if the unit suffers a casualty from battle magic.', 200],
    ['Ravenous', 'While any enemy unit is diminished, this unit can spend a round feeding on the corpses to increment their casualty die. ', 50],
    ['Hurl Rocks', 'If this unit succeeds on an Attack check, it inflicts 2 casualties. against fortifications, it inflicts 1d6 casualties', 250],
    ['Savage', 'This unit has advantage on the first Attack check it makes each battle.', 50],
    ['Stalwart', 'Enemy battle magic has disadvantage on Power checks against this unit.', 50],
    ['Twisting Roots', 'As an action, this unit can sap the walls of a fortification. Siege units have advantage on Power checks against sapped fortifications.', 200],
    ['Undead', 'Green and regular troops must pass a Morale check to attack this unit. Each enemy unit need only do this once.', 50]
  ]
  
  constructor() { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.name = ''
    this.attack = 0
    this.defense = 0
    this.power = 0
    this.toughness = 0
    this.morale = 0
    this.role = ''
    this.training = []
    this.traits = []
    this.typeFlag = '/assets/flags/type/levies.png'
    this.roleOverride = ''
    this.cardColor = '#b33320'
    this.selectedSize = this.unitSizes[1];

    this.onRecalculateTotals();
  }

  onRecalculateTotals() {
    if (this.selectedUnitType[0] === 'Levies') {
      this.selectedEquipment = this.unitEquipment[0]
      this.typeFlag = '/assets/flags/type/levies.png'
    } else {
      if (this.selectedUnitType[0] !== 'Levies'  && this.selectedEquipment[0] == '') {
        this.selectedEquipment = this.unitEquipment[1]
      }

      // Set the typeFlag
      this.typeFlag = `/assets/flags/type/${this.selectedUnitType[0].split(' ').join('-')}-${this.selectedEquipment[0]}.png`.toLowerCase()
    }


    this.attack = this.selectedExperience[1] + this.selectedEquipment[1] + this.selectedUnitType[1] + this.selectedRole[1]
    this.defense =  this.selectedExperience[2] + this.selectedEquipment[2] + this.selectedUnitType[2] + this.selectedRole[2]
    this.power = this.selectedExperience[3] + this.selectedEquipment[3] + this.selectedUnitType[3] + this.selectedRole[3]
    this.toughness = this.selectedExperience[4] + this.selectedEquipment[4] + this.selectedUnitType[4] + this.selectedRole[4]
    this.morale = this.selectedExperience[5] + this.selectedEquipment[5] + this.selectedUnitType[5] + this.selectedRole[5]

    let traitsCost = 0
    for (const trait of this.training) {
      this.attack += trait[1]
      this.defense += trait[2]
      this.power += trait[3]
      this.toughness += trait[4]
      this.morale += trait[5]
      if (trait[7]) {
        traitsCost += trait[7]
      }
    }
    for (const trait of this.traits) {
      traitsCost += trait[2]
    }

    // Cost [Attack + Power + Defense + Toughness + (Morale x 2)] * [Unit Type Mod] * [Size Mod] + Traits + 30

    this.cost = Math.ceil(
    (this.attack + this.power + this.defense + this.toughness + (this.morale * 2)) 
    * this.selectedUnitType[6]
    * this.selectedSize[1]
    + traitsCost
    + 30
    )
  }
}
