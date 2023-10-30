import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { testFixtures } from "@vue-macros/test-utils";
import { beforeAll, describe } from "vitest";

import { ensureLanguage } from "../src";
import { transform } from "../src/core/transform";

beforeAll(() => {
	ensureLanguage(join(__dirname, "__fixtures__", "tsconfig.json"));
});

describe("fixtures", async () => {
	await testFixtures(
		["__fixtures__/*.vue", "!__fixtures__/*.exclude.vue"],
		async (_args, id) => {
			const text = await readFile(id, { encoding: "utf-8" });

			return (transform(text, id) as any).code;
		},
		{
			cwd: __dirname,
			promise: true,
		},
	);
});