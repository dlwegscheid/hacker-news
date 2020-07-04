import React from 'react';
import {mount} from 'enzyme';
import StoryList from './StoryList';
import {StoriesContext} from '../contexts/StoriesProvider';
import Story from './Story';
import {nullStoryDetailsFactory, FullStory} from '../types';

jest.mock('../services/hackerNewsApi');

const mockDispatch = jest.fn();
const createStoryList = (mockData: FullStory[]) =>
  mount(<StoriesContext.Provider value={{
    stories: mockData,
    dispatch: mockDispatch
  }}>
    <StoryList />
  </StoriesContext.Provider >);

describe('StoryList component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders no stories without any data', () => {
    expect(createStoryList([]).exists(Story)).toBe(false);
  });

  it('renders no stories without any data', () => {
    expect(createStoryList([{id: 1}, {id: 2}]).exists(Story)).toBe(false);
  });

  it('renders stories when given details', () => {
    const wrapper = createStoryList([{id: 1, details: nullStoryDetailsFactory({id: 1})}, {id: 2}, {id: 3, details: nullStoryDetailsFactory({id: 3})}]);
    expect(wrapper.find(Story).length).toBe(2);
  });
});