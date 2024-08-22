import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodtype.enum';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Gender',
    default: Gender.MALE,
    enum: Gender,
  })
  gender: Gender;

  @ApiProperty({ example: 26 })
  age: number;

  @ApiProperty({ example: '1999-03-11' })
  birthday: Date;

  @ApiProperty({ example: 184 })
  height: number;

  @ApiProperty({ example: 'Seoul' })
  addressOfHome: string;

  @ApiProperty({
    description: 'BloodType',
    default: BloodType.TYPE_A,
    enum: BloodType,
  })
  bloodType: BloodType;

  @ApiProperty({ example: 'I am a boy' })
  introduction: string;
}
