import { test } from '@playwright/test';

export async function logStep(message: string): Promise<void> {
  await test.step(message, async () => {
    console.log(message);
  });
}
