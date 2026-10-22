import assert from "node:assert/strict";
import test from "node:test";
import { catalogEntries, getEntryDescription, getEntryTitle, serviceEntries, servicePillars } from "../content/service-catalog";

test("service catalog contains the complete four-pillar architecture", () => {
  assert.deepEqual(servicePillars.map((pillar) => pillar.name), ["Design", "Development", "AI", "Digital Marketing"]);
  assert.equal(servicePillars.flatMap((pillar) => pillar.categories).length, 13);
  assert.equal(serviceEntries.length, 69);
  assert.equal(catalogEntries.length, 86);
});

test("routes, titles, and descriptions are unique and complete", () => {
  const routes = catalogEntries.map((entry) => entry.href);
  const titles = catalogEntries.map(getEntryTitle);
  const descriptions = catalogEntries.map(getEntryDescription);
  assert.equal(new Set(routes).size, routes.length);
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descriptions).size, descriptions.length);
  assert.ok(catalogEntries.every((entry) => entry.href.startsWith(`/services/${entry.pillar.slug}`)));
  assert.ok(catalogEntries.every((entry) => getEntryTitle(entry) && getEntryDescription(entry)));
});

test("every related service resolves to a published service", () => {
  const slugs = new Set(serviceEntries.map((entry) => entry.service!.slug));
  const missing = serviceEntries.flatMap((entry) => entry.service!.related.filter((slug) => !slugs.has(slug)));
  assert.deepEqual(missing, []);
});

test("services have differentiated intent, scope, and use cases", () => {
  assert.ok(serviceEntries.every((entry) => entry.service!.intent.length > 20));
  assert.ok(serviceEntries.every((entry) => entry.service!.deliverables.length >= 3));
  assert.ok(serviceEntries.every((entry) => entry.service!.useCases.length >= 2));
  assert.equal(new Set(serviceEntries.map((entry) => entry.service!.outcome)).size, serviceEntries.length);
});
