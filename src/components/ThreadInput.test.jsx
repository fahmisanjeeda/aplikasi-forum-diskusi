/**
 * skenario pengujian
 *
 * - ThreadInput component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call addThread function when form submitted
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Apa yang ingin Anda diskusikan?');

    // act
    await userEvent.type(titleInput, 'Diskusi Testing React');

    // assert
    expect(titleInput).toHaveValue('Diskusi Testing React');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('Contoh: react, redux, general');

    // act
    await userEvent.type(categoryInput, 'react');

    // assert
    expect(categoryInput).toHaveValue('react');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyInput = screen.getByPlaceholderText('Jelaskan topik diskusi Anda secara detail...');

    // act
    await userEvent.type(bodyInput, 'Ini adalah konten diskusi mengenai testing');

    // assert
    expect(bodyInput).toHaveValue('Ini adalah konten diskusi mengenai testing');
  });

  it('should call addThread function with correct arguments when form submitted', async () => {
    // arrange
    const mockAddThread = vi.fn();
    render(<ThreadInput addThread={mockAddThread} />);
    const titleInput = screen.getByPlaceholderText('Apa yang ingin Anda diskusikan?');
    const categoryInput = screen.getByPlaceholderText('Contoh: react, redux, general');
    const bodyInput = screen.getByPlaceholderText('Jelaskan topik diskusi Anda secara detail...');
    const submitButton = screen.getByRole('button', { name: /terbitkan diskusi/i });

    // act
    await userEvent.type(titleInput, 'Diskusi Testing React');
    await userEvent.type(categoryInput, 'react');
    await userEvent.type(bodyInput, 'Ini adalah konten diskusi mengenai testing');
    await userEvent.click(submitButton);

    // assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Diskusi Testing React',
      category: 'react',
      body: 'Ini adalah konten diskusi mengenai testing',
    });
  });
});

