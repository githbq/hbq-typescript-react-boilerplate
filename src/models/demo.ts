import { observable, useStrict, action } from 'mobx'

useStrict(true)
class MyState {
    @observable num = 0
    @action addNum = () => {
        this.num++
    }
}
export const newState = new MyState()