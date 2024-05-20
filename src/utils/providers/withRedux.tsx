import { Provider } from 'react-redux'
import store from '@store/store'

export function withRedux(Component: any) {
  return (props: any) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
}
