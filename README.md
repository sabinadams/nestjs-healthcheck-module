## Description

NestJS Module that adds a `/health-check` route to the module you import this into with a configurable service label.

---

## Usage

Install the package via npm: `npm install nest-healthcheck`

This dynamic module has a static method `register()` that allows you to optionally provide a service label as a parameter to include in the response of the health-check.

Here is a simple example based off of the starter NestJS application.

```typescript
import { HealthCheckModule } from 'nest-healthcheck';

import { AppService } from './app.service';

@Module({
  imports: [HealthCheckModule.register('TEST SERVICE')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

The application will now have a route `/health-check` that will return the following response:

```json
{
  "payload": "OK",
  "service": "TEST SERVICE"
}
```

*If no value is passed to the register method, the `service` key will be omitted from the response*

---

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

---

## To-Do
- Allow full configuration of response, not just a service label
