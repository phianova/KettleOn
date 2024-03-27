
const { dbConnect } = require('./mongo');
const { UserSchema } = require('../models/user');
const { QuestionSchema } = require('../models/question');

describe('add user', () => {
  let connection : any;

  beforeAll(async () => {
    connection = await dbConnect();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should add a user', async () => {
    
    const newUser = await UserSchema.create({
      email: "test@test.com",
      username: "test",
      team: "test",
      teamname: "test",
      company: "test",
      role: "test",
      image: "test",
      bio: "test",
      prompts: [],
      game: [{
        name: "test",
        score: 0,
        usage: 0
      }],
      rank: 0
    })
    
    const foundUser = await UserSchema.findOne({ email: "test@test.com" });

    expect(foundUser).toEqual(newUser);
  });
});

describe('submit answer & check question', () => {
    let connection : any;
  
    beforeAll(async () => {
      connection = await dbConnect();
    });
  
    afterAll(async () => {
      await connection.close();
    });
  
    it('should submit an answer, then identify that question as "asked"', async () => {
        const testUser = await UserSchema.findOne({ email: "test@test.com" });
        const newPromptsArray = testUser.prompts
        newPromptsArray.push({ question: "What's your favourite test?", answer: "This one!" })
        const user = await UserSchema.findOneAndUpdate({ email: "test@test.com" }, { prompts: newPromptsArray });
        const question = await QuestionSchema.create({ question: "What's your favourite test?"},  { asked: new Date() });

        const alreadyAsked = user.prompts.find((q : any) => q.question === question?.question) ? true : false;
  
        expect(user.prompts).toEqual(newPromptsArray);
        expect(alreadyAsked).toEqual(true);
    });
  });