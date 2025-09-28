import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeSummary from '../RecipeSummary';

describe('RecipeSummary', () => {
  it('renders recipe summary with all information', () => {
    const ingredients = [
      '100 g de manteiga (temperatura ambiente)',
      '120 g de açúcar refinado',
      '3 ovos'
    ];
    const instructions = [
      'Pré-aqueça o forno a 180°C.',
      'Bata a manteiga com o açúcar.',
      'Adicione os ovos um por vez.'
    ];

    render(
      <RecipeSummary
        title="Bolo de Chocolate"
        cover="/images/test.jpg"
        prepTime="30 minutos"
        cookTime="45 minutos"
        totalTime="1 hora 15 minutos"
        servings="8 porções"
        category="BOLOS"
        ingredients={ingredients}
        instructions={instructions}
      />
    );

    expect(screen.getByText('BOLOS')).toBeInTheDocument();
    expect(screen.getByText('Bolo de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Tempo de preparo')).toBeInTheDocument();
    expect(screen.getByText('30 minutos')).toBeInTheDocument();
    expect(screen.getByText('Tempo de cozimento')).toBeInTheDocument();
    expect(screen.getByText('45 minutos')).toBeInTheDocument();
    expect(screen.getByText('Tempo total')).toBeInTheDocument();
    expect(screen.getByText('1 hora 15 minutos')).toBeInTheDocument();
    expect(screen.getByText('Rendimento')).toBeInTheDocument();
    expect(screen.getByText('8 porções')).toBeInTheDocument();
    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('100 g de manteiga (temperatura ambiente)')).toBeInTheDocument();
    expect(screen.getByText('Modo de preparo')).toBeInTheDocument();
    expect(screen.getByText('Pré-aqueça o forno a 180°C.')).toBeInTheDocument();
    expect(screen.getByTitle('Imprimir receita')).toBeInTheDocument();
  });

  it('renders with minimal information', () => {
    render(
      <RecipeSummary
        totalTime="1 hora"
        servings="4 pessoas"
      />
    );

    expect(screen.getByText('Resumo da receita')).toBeInTheDocument();
    expect(screen.getByText('Tempo total')).toBeInTheDocument();
    expect(screen.getByText('1 hora')).toBeInTheDocument();
    expect(screen.getByText('Rendimento')).toBeInTheDocument();
    expect(screen.getByText('4 pessoas')).toBeInTheDocument();
    
    // Should not render missing information
    expect(screen.queryByText('Tempo de preparo')).not.toBeInTheDocument();
    expect(screen.queryByText('Tempo de cozimento')).not.toBeInTheDocument();
    expect(screen.queryByText('BOLOS')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RecipeSummary
        totalTime="30 minutos"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders print button and handles print functionality', async () => {
    const user = userEvent.setup();
    const mockWindowOpen = vi.fn().mockReturnValue({
      document: {
        write: vi.fn(),
        close: vi.fn(),
      },
      onload: null,
      focus: vi.fn(),
      print: vi.fn(),
      close: vi.fn(),
    });

    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: mockWindowOpen,
      writable: true,
    });

    render(
      <RecipeSummary
        totalTime="1 hora"
        servings="4 pessoas"
        ingredients={['ingrediente 1', 'ingrediente 2']}
        instructions={['passo 1', 'passo 2']}
      />
    );

    const printButton = screen.getByTitle('Imprimir receita');
    expect(printButton).toBeInTheDocument();

    await user.click(printButton);

    expect(mockWindowOpen).toHaveBeenCalledWith('', '_blank');
  });
});
