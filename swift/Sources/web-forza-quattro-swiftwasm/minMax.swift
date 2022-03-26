//
//  File.swift
//  
//
//  Created by Francesco S on 18/01/21.
//

import Foundation

func minMax (
    state: GameState,
    isMaximizing : Bool,
    maxDepth: Int,
    depth: Int = 0
) -> [Int] {
    
    var bestMove = -1;
    var bestScore = isMaximizing ? Int(-1000000) : Int(+1000000);

    for col in allowedColumns(board: state.board) {
        let tempGame = playInColumn(state: state, col: col);
        let tempGameScore = score(board: tempGame.board)
        var newBestScore: Int = 0;

        if (!isTerminal(board: tempGame.board) && depth < maxDepth) {
            newBestScore = minMax(state: tempGame, isMaximizing: !isMaximizing, maxDepth: maxDepth, depth: depth + 1)[0];
            
//            print(newBestScore)
        } else {
          newBestScore = tempGameScore;
        }

        if (isMaximizing && newBestScore > bestScore) {
            
          bestScore = newBestScore;
//            print("maximizing with new score \(bestScore)")
          bestMove = col;
        }

        if (!isMaximizing && newBestScore < bestScore) {
            
          bestScore = newBestScore;
//            print("minimizing with new score \(bestScore)")
          bestMove = col;
        }
    }

    return [bestScore, bestMove];
};
