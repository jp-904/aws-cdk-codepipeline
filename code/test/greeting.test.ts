import { handler } from "../src/greeting";

describe ('Test calcualteHanlder', function (){
    it('Happy Flow', async()=>{
        let emptyBody = {};
        let event = { body: emptyBody};
        
        const result = await handler(event);
        expect(result.statusCode).toEqual(200);
    });
});