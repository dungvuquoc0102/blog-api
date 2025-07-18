const { faker } = require("@faker-js/faker");

fakeUser = (length = 10) => {
  return new Array(length).fill("_").map(() => {
    return {
      email: faker.internet.email(),
      password: "123456", // fixed for simplicity
      two_factor_enabled: faker.datatype.boolean(),
      two_factor_secret: faker.string.alphanumeric(16),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
      title: faker.person.jobTitle(),
      about: faker.lorem.sentence(),
      posts_count: faker.number.int({ min: 0, max: 100 }),
      address: faker.location.streetAddress(),
      website_url: faker.internet.url(),
      x_url: `https://x.com/${faker.internet.username()}`,
      github_url: `https://github.com/${faker.internet.username()}`,
      linkedin_url: `https://linkedin.com/in/${faker.internet.username()}`,
      verified_at: faker.helpers.maybe(() => faker.date.past(), {
        probability: 0.3,
      }),
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
};

module.exports = {
  fakeUser,
};
