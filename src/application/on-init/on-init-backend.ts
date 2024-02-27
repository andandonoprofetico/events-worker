import { IExternalServicesRepository } from '@/infra/db/protocols';
import { ListUserTokenHttp } from '@/infra/http/backend/contracts';

import { OnInit } from '../domain';

export class OnInitBackend implements OnInit {
  constructor(
    private readonly externalServicesRepository: IExternalServicesRepository,
    private readonly listUserTokenHttp: ListUserTokenHttp,
  ) {}

  async init(): Promise<void> {
    const authentications =
      await this.externalServicesRepository.listByName<any>(
        'andando-no-profetico',
      );

    await Promise.allSettled(
      authentications.map(async (auth) => {
        if (auth.data?.token) {
          return null;
        }

        const response = await this.listUserTokenHttp.auth({
          email: auth.data.email,
          password: auth.data.password,
        });

        if (!response) {
          return null;
        }

        await this.externalServicesRepository.update(
          {
            data: JSON.stringify({
              ...auth.data,
              token: response.token,
            }),
          },
          auth.externalServiceId,
        );
      }),
    );
  }
}
