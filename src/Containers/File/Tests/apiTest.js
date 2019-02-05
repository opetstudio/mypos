import API from '../../../Services/Api'

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const api = API.create(baseUrl)

test('Api getFiles', async () => {
  const response = await api.getFiles()
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api getFile', async () => {
  const id = 1
  const response = await api.getFile({ id })
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api postFile', async () => {
  const data = {
    field1: 'value1'
  }
  const response = await api.postFile(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api updateFile', async () => {
  const data = {
    id: 1,
    field1: 'value1'
  }
  const response = await api.updateFile(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api removeFile', async () => {
  const data = {
    id: 1
  }
  const response = await api.removeFile(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
