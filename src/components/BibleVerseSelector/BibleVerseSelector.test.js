import React from 'react';
import { shallow } from 'enzyme'
import BibleVerseSelector from './BibleVerseSelector';

let wrapper;

let book;
let chapter;
let verse;

beforeAll(() => {
  wrapper = shallow(<BibleVerseSelector />)

  book = () => wrapper.find('[data-testid="book"]')
  chapter = () => wrapper.find('[data-testid="chapter"]')
  verse = () => wrapper.find('[data-testid="verse"]')
})

beforeEach(() => {
  book().simulate('change', { target: { value: '' } })
  chapter().simulate('change', { target: { value: '' } })
  verse().simulate('change', { target: { value: '' } })
})

afterAll(() => {
  wrapper.unmount()
})

it('enables chapter input after inputting valid book', () => {
  book().simulate('change', { target: { value: 'genesis' } })
  expect(chapter().prop('disabled')).toEqual(false)

  book().simulate('change', { target: { value: 'numbers' } })
  expect(chapter().prop('disabled')).toEqual(false)

  book().simulate('change', { target: { value: 'psalms' } })
  expect(chapter().prop('disabled')).toEqual(false)
});

it('disables chapter input after inputting invalid book', () => {
  book().simulate('change', { target: { value: 'random string' } })
  expect(chapter().prop('disabled')).toEqual(true)

  book().simulate('change', { target: { value: 'number' } })
  expect(chapter().prop('disabled')).toEqual(true)

  book().simulate('change', { target: { value: 'judge' } })
  expect(chapter().prop('disabled')).toEqual(true)
});

it('enables verse input after inputting valid chapter', () => {
  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  expect(verse().prop('disabled')).toEqual(false)

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '50' } })
  expect(verse().prop('disabled')).toEqual(false)

  book().simulate('change', { target: { value: 'psalms' } })
  chapter().simulate('change', { target: { value: '150' } })
  expect(verse().prop('disabled')).toEqual(false)
});

it('disables verse input after inputting invalid chapter', () => {
  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '0' } })
  expect(verse().prop('disabled')).toEqual(true)

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '51' } })
  expect(verse().prop('disabled')).toEqual(true)

  book().simulate('change', { target: { value: 'psalms' } })
  chapter().simulate('change', { target: { value: '250' } })
  expect(verse().prop('disabled')).toEqual(true)
});

it('calls onChange when complete', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  expect(onChange).toHaveBeenLastCalledWith({ book: 1, chapter: 1, verse: 1 })
});

it('calls onChange with null when verse changed to not complete', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  verse().simulate('change', { target: { value: '0' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('calls onChange with null when chapter changed to not complete', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  chapter().simulate('change', { target: { value: '0' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('calls onChange with null when book changed to not complete', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  book().simulate('change', { target: { value: 'asd' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('calls onChange when book changed but value still valid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  book().simulate('change', { target: { value: 'numbers' } })
  expect(onChange).toHaveBeenLastCalledWith({ book: 4, chapter: 1, verse: 1 })
});

it('calls onChange with null when book changed and value invalid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  book().simulate('change', { target: { value: 'random book' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('calls onChange when chapter changed but value still valid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  chapter().simulate('change', { target: { value: '5' } })
  expect(onChange).toHaveBeenLastCalledWith({ book: 1, chapter: 5, verse: 1 })
});

it('calls onChange with null when chapter changed and value invalid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  chapter().simulate('change', { target: { value: '100' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('calls onChange when verse changed but value still valid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  verse().simulate('change', { target: { value: '5' } })
  expect(onChange).toHaveBeenLastCalledWith({ book: 1, chapter: 1, verse: 5 })
});

it('calls onChange with null when verse changed and value invalid', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  verse().simulate('change', { target: { value: '1' } })

  verse().simulate('change', { target: { value: '100' } })
  expect(onChange).toHaveBeenLastCalledWith(null)
});

it('only calls onChange if value is different', () => {
  const onChange = jest.fn()
  wrapper.setProps({ onChange })

  // First call -> null
  book().simulate('change', { target: { value: 'genesis' } })
  chapter().simulate('change', { target: { value: '1' } })
  // Second call -> book
  verse().simulate('change', { target: { value: '1' } })
  
  // Third call -> null
  verse().simulate('change', { target: { value: '100' } })

  // Shouldn't call again
  verse().simulate('change', { target: { value: '200' } })
  expect(onChange).toHaveBeenCalledTimes(2)
});
