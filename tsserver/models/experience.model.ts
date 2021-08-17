const { Model, Optional } = require('sequelize');
import { ExperienceAttributes } from './experience.model';

console.log('model:                       🙋 entering experience.model');


export interface ExperienceAttributes {
  id: number
  title: string
  description: string
  location: string
  price: number
  // image: string
  // from: Date
  // to: Date
  // quantity: number
  // type: string
  readonly createdAt: Date
  readonly updatedAt: Date
  // [propName: string]: any
}

// interface ExperienceCreationAttributes extends Optional<ExperienceAttributes, "id"> { }

// class Experience extends Model<ExperienceAttributes, ExperienceCreationAttributes>
//   implements ExperienceAttributes {
//   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
//   public title!: string;
//   public description!: string; // for nullable fields
//   public location!: string;
//   public price!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;


  const ExperienceModel = (seq: any, types: any): any => {
    const Experience extends Model<ExperienceAttributes>
    implements ExperienceAttributes { 
    //  = seq.define<ExperienceAttributes>('Experience', {
    title: {
      type: types.STRING,
      allowNull: false,
    },
    description: {
      type: types.STRING,
      allowNull: false
    },
    location: {
      type: types.STRING,
      allowNull: false
    },
    price: {
      type: types.INTEGER,
      allowNull: false
    },
    image: {
      type: types.STRING,
    },
    from: {
      type: types.DATE
    },
    to: {
      type: types.DATE
    },
    quantity: {
      type: types.INTEGER
    },
    type: {
      type: types.ENUM('type1', 'type2')
    },
    timestamps: types.DATE
  },
    {

    });
  Experience.associate = function (models) {
    Experience.belongsTo(models.User);
  };
  return Experience
};


module.exports = ExperienceModel
