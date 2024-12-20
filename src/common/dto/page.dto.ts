import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '@common/dto/page-meta.dto';

export class PageDto<T> {
  @ApiProperty()
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
