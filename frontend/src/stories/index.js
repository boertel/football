import React from 'react';

import '../css/index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {
  Button,
  FormActions,
  FormGroup,
  FormSection,
  TextInput,
} from '../ui';

storiesOf('Button', module)
  .add('type=submit', () => <Button type="submit">Submit Button</Button>)
  .add('primary', () => <Button className="primary">Primary Button</Button>)
  .add('secondary', () => <Button className="secondary">Secondary Button</Button>)
  .add('danger', () => <Button className="danger xsmall">Danger Button</Button>)
  .add('form', () => <div><Button className="link">Cancel</Button><Button type="submit">Submit Button</Button></div>)


storiesOf('Input Text', module)
  .add('basic', () => <TextInput />)
  .add('danger', () => <TextInput className="danger" />)

storiesOf('Forms', module)
  .add('basic', () => (
    <FormSection>
      <FormGroup label="Email Address"><TextInput name="username" type="email" /></FormGroup>
      <FormGroup label="Password"><TextInput name="password" type="password" /></FormGroup>
      <FormActions>
        <Button type="submit">Login</Button>
      </FormActions>
    </FormSection>
  ))
