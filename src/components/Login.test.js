import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./login/Login"

jest.mock('axios', () => ({

    __esModule: true,

    default: {
        get: () => ({
            data: { id: 1, name: 'John' }
        })
    }
}))

test('username input should be rendered', () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    expect(userInputEl).toBeInTheDocument()
})

test('password input should be rendered', () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    expect(passwordInputEl).toBeInTheDocument()
})

test('button should be rendered', () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    expect(buttonInputEl).toBeInTheDocument()
})

test('username input should be empty', () => {
    render(<Login />)
    const userInputEmpty = screen.getByPlaceholderText(/username/i)
    expect(userInputEmpty.value).toBe('')
})

test('Password Input should be emplty', () => {
    render(<Login />)
    const passwordInputEmpty = screen.getByPlaceholderText(/password/i)
    expect(passwordInputEmpty.value).toBe('')
})

test('Button should be disabled', () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    expect(buttonInputEl).toBeDisabled()
})

test('Error Message should not be visibled', () => {
    render(<Login />)
    const errorEl = screen.getByTestId('error')
    expect(errorEl).not.toBeVisible()
})

test('username input should be changed', () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const testValue = 'test'

    fireEvent.change(userInputEl, { target: { value: testValue } })
    expect(userInputEl.value).toBe(testValue)
})

test('password input should be changed', () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = 'password'

    fireEvent.change(passwordInputEl, { target: { value: 'password' } })
    expect(passwordInputEl.value).toBe(testValue)
})

test('Button should be clickabled when inputs fulfilled', () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = 'test'

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })

    expect(buttonInputEl).not.toBeDisabled()
})

test('Button should be rendered Loading when clicking', () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = 'test'

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })

    fireEvent.click(buttonInputEl)

    expect(buttonInputEl).toHaveTextContent('please wait')
})

test('Loading not rendered after fetching', async () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = 'test'

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.click(buttonInputEl)

    await waitFor(() => expect(buttonInputEl).not.toHaveTextContent('please wait'))
})

test('username input should be rendered after fetching', async () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole('button')
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = 'test'

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.click(buttonInputEl)

    const username = await screen.findByText('John')

    expect(username).toBeInTheDocument()
})