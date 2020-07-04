import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {Time} from '@doist/reactist';
import Story, {ArticleLink} from './Story';
import {nullStoryDetailsFactory} from '../types';

const details = nullStoryDetailsFactory({title: 'title', url: 'http://test.test', by: 'author', time: 100});


describe('Story component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Story story={details} />);
  });

  it('renders title', () => {
    expect(wrapper.contains(details.title)).toBe(true);
  });

  it('renders author', () => {
    expect(wrapper.contains(details.by)).toBe(true);
  });

  it('renders link', () => {
    expect(wrapper.find(ArticleLink).props().href).toBe(details.url);
  });

  it('renders time', () => {
    expect(wrapper.find(Time).props().time).toBe(details.time);
  });
});