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
    
//    var bestMove = -1;
//    var bestScore = isMaximizing == true ? Int(-1000000) : Int(-1000000);
//
//    for col in allowedColumns(board: state.board) {
//        let tempGame = playInColumn(state: state, col: col);
//        let tempGameScore = score(board: tempGame.board)
//        var newBestScore: Int;
//
//        if (!isTerminal(board: tempGame.board) && depth < maxDepth) {
//            newBestScore = minMax(state: tempGame, isMaximizing: !isMaximizing, maxDepth: maxDepth, depth: depth + 1).0;
//        } else {
//          newBestScore = tempGameScore;
//        }
//
//        if (isMaximizing && newBestScore > bestScore) {
//          bestScore = newBestScore;
//          bestMove = col;
//        }
//
//        if (!isMaximizing && newBestScore < bestScore) {
//          bestScore = newBestScore;
//          bestMove = col;
//        }
//    }

    return [100, 4];
};
