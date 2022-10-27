require 'spec_helper'

class String
    def h(abbrev=nil)
        #abbrev.nil? ? self : "#{self} (#{abbrev})"
        abbrev
    end
end

describe 'C4 6x7 4; ' do

    tests = [['1a1', 'P1 wins horizontally in left of row 0', 'aabbccd', 1],
             ['1a2', 'P2 wins horizontally in middle of row 0',  'accddeef', 2],
             ['1a3', 'P2 wins horizontally in right of row 0',  'bddeeffg', 2],

             ['1b1', 'P2 wins horizontally in left of row 1', 'aabbccadbd', 2],
             ['1b2', 'P1 wins horizontally in middle of row 1',  'bccddeebfbf', 1],
             ['1b3', 'P1 wins horizontally in right of row 1',  'bddeeffbgbg', 1],

             ['1c1', 'P1 wins horizontally in left of row 4', 'aaaaagbbbbbccccdcdddd', 1],
             ['1c2', 'P1 wins horizontally in middle of row 4',  'cccccadddddeeeefeffff', 1],
             ['1c3', 'P2 wins horizontally in right of row 4',  'bdddddaeeeeeffffgfgggg', 2],

             ['1d1', 'P2 wins horizontally in left of row 5',   'aaaaaabbbbbbccccccfdddddfd', 2],
             ['1d2', 'P2 wins horizontally in middle of row 5', 'bbbbbbccccccddddddfeeeeefe', 2],
             ['1d3', 'P2 wins horizontally in right of row 5',  'addddddeeeeeeffffffbgggggbg', 1],

             ['2a1',  'P2 wins vertically at bottom of column 0', 'bababaca', 2],
             ['2a2', 'P2 wins vertically in middle of column 0', 'aabababa', 2],
             ['2a3', 'P1 wins vertically at top of column 0',   'cababbababaca', 1],

             ['2b1',  'P1 wins vertically at bottom of column 3', 'cdcdcfc', 1],
             ['2b2', 'P2 wins vertically in middle of column 4', 'ddcdcdcd', 2],
             ['2b3', 'P1 wins vertically at top of column 5',   'cdbdbbdbdbdcd', 1],

             ['2c1', 'P2 wins vertically at bottom of column 7', 'bgbgbgcg', 2],
             ['2c2', 'P1 wins vertically in middle of column 7', 'cggbgbgbg', 1],
             ['2c3', 'P1 wins vertically at top of column 7', 'cgbgbbfbgbgcgeg', 1],

             ['3a1', 'P1 wins up to right from bottom-left corner', 'abbccdcddfd', 1],
             ['3a2', 'P2 wins up to right from middle of diagonal', 'gbcdebccddedeege', 2],
             ['3a3', 'P1 wins up to right to top',                  'cdeffedccddeefeffaf', 1],

             ['3b1a', 'P2 wins up to right from bottom', 'gbccddedeege', 2],
             ['3b1b', 'P1 wins up to right from bottom', 'bccddedeege', 1],
             ['3b2', 'P2 wins up to right from above bottom', 'bcdegbccddedeege', 2],
             ['3b3', 'P1 wins up to right to top of diagonal',      'defggfeddeeffgfggag', 1],

             ['3c', 'P1 wins lower-right diagonal', 'gggfgffeecd', 1],
             ['3d', 'P1 wins up to right ending right', 'defggggfgffeecd', 1],
             ['3e', 'P1 wins up to right middle', 'cdeffffefeeddbc', 1],
             ['3f', 'P1 wins up to right from left edge', 'abcdabbccdcdded', 1],
             ['3g', 'P2 wins up to right upper left cornere', 'gdcababcdabbccdcdded', 2],

             ['4a1', 'P2 wins up to left bottom', 'efdeddcccc', 2],
             ['4a2', 'P1 wins up to left bottom-right corner', 'bfgefeedddd', 1],
             ['4a3', 'P2 wins up to left lower-left diagonal', 'cdbcbbaaaa', 2],

             ['4b1a', 'P2 wins up to left middle (a)', 'cdefefdeddcccc', 2],
             ['4b1b', 'P1 wins up to left middle (b)', 'abcdedecdccbbbb', 1],
             ['4b2', 'P2 wins up to left middle to left', 'abcdcdbcbbaaaa', 2],

             ['4c1', 'P1 wins up to left upper-left corner', 'fabcdabcdcdbcbbaaaa', 1],

             ['4d1', 'P1 wins up to left ends at top', 'aaaaafabcdebcdedecdccbbbb', 1],
             ['4d2', 'P1 wins up to left ends at top',          'bbbbbgbcdefcdefefdeddcccc', 1],
             ['4d3', 'P2 wins up to left upper-right diagonal', 'acccccacdefgdefgfgefeedddd', 2],
             ['4d4', 'P1 wins up to left start on right',       'accccdefgfgefeedddd', 1],

             ['bad1a', 'Middle column gets full', 'cccccccddeef', 1],
             ['bad1b', 'Left column gets full', 'aaaaaaabbccfdfd', 2],
             ['bad2', 'Column too large', 'ccddeehf', 1],
             ['bad3', 'Input is a number', 'abbccdd9e', 2]
          
            # Test that each corner with length of 3 doesn't result in a win.
            # When testing different boards, make sure there is one "middle" test for each diagonal and each edge (top bottom left right)d
                      
    ]   

    selected_tests = tests #.select { |t| t.first.start_with? '1a1'}

    selected_tests.each do |test|
        abbrev, name, turns, winner = test

        it "In Progress #{name}".h("#{abbrev}x") do
          result1 = test_c4("#{turns.chop}q")
          expect(result1).to be_abandoned
        end

        it name.h(abbrev) do
          result2 = test_c4("#{turns}q")
          expect(result2).to declare_win_for winner
        end # it
    end # each test
end # describe


#describe 'Connect 4 alternate' do
#    it 'detects player 2 winning horizontally on a big board'.h do
#        result = test_c4('iaabbccddeeffg', 3, 9, 7)
#        expect(result).to declare_win_for 2
#    end
#
# end