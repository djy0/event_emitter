// const Emitter = require('./emitter_class')
import Emitter from './emitter_class'

// const emitter = new Emitter()
jest.mock('./emitter_class')
beforeEach(() => {
    Emitter.mockClear()
})

test('new emitter is not null after init', () => {
    expect(emitter).not.toEqual(null)
})

const sub1 = emitter.subscribe('click', (args) => {
    console.log(args.concat('sub1'))
})

const sub2 = emitter.subscribe('click', (args) => {
    console.log(args.concat('sub2'))
})

let outputData = [];
const storeLog = inputs => (outputData.push(inputs));
test('emit click with two events', () => {
    outputData = []
    console["log"] = jest.fn(storeLog);
    emitter.emit('click', 1, 2);
    expect(outputData).toEqual([[1, 2, 'sub1'], [1, 2, 'sub2']])
});


test('emit click after sub1 release', () => {
    outputData = []
    const sub1_release_result = sub1.release()
    console["log"] = jest.fn(storeLog);
    emitter.emit('click', 3, 4);
    expect(sub1_release_result).toEqual(true)
    expect(outputData).toEqual([[3, 4, 'sub2']])
});

test('emit click after sub2 release', () => {
    outputData = []
    const sub2_release_result = sub2.release()
    console["log"] = jest.fn(storeLog);
    emitter.emit('click', 3, 4);
    expect(sub2_release_result).toEqual(true)
    expect(outputData).toEqual([])

    const sub1_release_result = sub1.release()
    expect(sub1_release_result).toEqual(false)
    emitter.emit('click', 3, 4);
    expect(outputData).toEqual([])
});
