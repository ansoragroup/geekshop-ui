import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Radio, RadioGroup } from './Radio'

describe('RadioGroup', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with role="radiogroup"', () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders radio options with role="radio"', () => {
    render(
      <RadioGroup>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
  })

  it('checks the default value', () => {
    render(
      <RadioGroup defaultValue="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeChecked()
    expect(radios[1]).toBeChecked()
  })

  it('calls onChange when a radio is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="a" onChange={onChange}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )

    await user.click(screen.getByText('B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('supports controlled value', () => {
    render(
      <RadioGroup value="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeChecked()
    expect(radios[1]).toBeChecked()
  })

  it('disables all radios when group is disabled', () => {
    render(
      <RadioGroup disabled>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeDisabled()
    expect(radios[1]).toBeDisabled()
  })

  it('disables a single radio when individually disabled', () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
        <Radio value="b" disabled>B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeDisabled()
    expect(radios[1]).toBeDisabled()
  })

  it('does not call onChange when disabled radio is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(
      <RadioGroup disabled onChange={onChange}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )

    await user.click(screen.getByText('B'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders horizontal layout', () => {
    render(
      <RadioGroup direction="horizontal">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders labels for radio options', () => {
    render(
      <RadioGroup>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>,
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('sets aria-checked on the selected radio', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    expect(radios[1]).toHaveAttribute('aria-checked', 'false')
  })
})
