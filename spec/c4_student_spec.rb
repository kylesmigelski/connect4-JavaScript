# zk Name
require 'spec_helper'

describe 'C4 standard board size' do
    it 'detects P1 winning horizontally in row 0' do
        # Notice that the game should end before the last 'q' input is consumed
        result = test_c4('aabbccdq')
        expect(result).to declare_win_for 1
    end

    it 'quits before declaring a winner in column 0' do
        result = test_c4('abababq')
        expect(result).to be_abandoned
    end

    it 'detects P1 winning diagonally' do
        result = test_c4('abbcdccdeddq')
        expect(result).to declare_win_for 1
    end

    it 'detects P1 winning vertically in column A' do
        result = test_c4('abacabaq')
        expect(result).to declare_win_for 1
    end

    it 'detects P2 winning horizontally in row 1' do
        result = test_c4('abcdeaebecfdq')
        expect(result).to declare_win_for 2
    end

    # zk Remember, there is more than one type of diagonal.

    it 'detects P2 winning diagonally' do
        result = test_c4('abccdeddeefeq')
        expect(result).to declare_win_for 2
    end

    it 'detects P2 winning vertically in column B' do
        result = test_c4('abcbcbcbq')
        expect(result).to declare_win_for 2
    end

    it 'quits before declaring a winner' do
        result = test_c4('aaefq')
        expect(result).to be_abandoned
    end

    # zk Check that it handles incorrect input.


end


describe 'Connect 4 alternate' do
    it 'detects player 2 winning horizontally on a big board' do
        result = test_c4('iaabbccddeeffgq', 3, 9, 7)
        expect(result).to declare_win_for 2
    end

    it 'quits before declaring a winner in column 0' do
        result = test_c4('iaabbccddeeffq', 3, 9, 7)
        expect(result).to be_abandoned
    end

    it 'detects player 1 winning horizontally on a big board' do
        result = test_c4('aiabbccddeeffggq', 3, 9, 7)
        expect(result).to declare_win_for 1
    end

    it 'quits before declaring a winner in column 0' do
        result = test_c4('ababq', 5, 5, 3)
        expect(result).to be_abandoned
    end

    it 'detects player 1 winning horizontally in row 0' do
        result = test_c4('aabecq', 5, 5, 3)
        expect(result).to declare_win_for 1
    end

    it 'detects player 2 winning horizontally in row 1' do
        result = test_c4('aabbececq', 5, 5, 3)
        expect(result).to declare_win_for 2
    end

    it 'detects player 1 winning vertically in column A' do
        result = test_c4('abacaq', 5, 5, 3)
        expect(result).to declare_win_for 1
    end

    it 'detects player 1 winning diagonally' do
        result = test_c4('abbcdccq', 5, 5, 3)
        expect(result).to declare_win_for 1
    end

    it 'detects player 2 winning diagonally' do
        result = test_c4('aabcbbccdcq', 5, 5, 3)
        expect(result).to declare_win_for 2
    end

    it 'quits before declaring a winner' do
        result = test_c4('aabq', 5, 5, 3)
        expect(result).to be_abandoned
    end
end
