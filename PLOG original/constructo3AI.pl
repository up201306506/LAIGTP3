valid_move(V1, V2) :-
	V1 = 1, V2 = 2, !; V1 = 1, V2 = 7, !;
	V1 = 2, V2 = 5, !; V1 = 2, V2 = 6, !;
	V1 = 5, V2 = 1, !.

choose_first_possible_move_board_1(P1, P2, NV1, NV2) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '2', C2 = '1', valid_move(V1, V2), P1 is 1, P2 is 2, NV1 is V1, NV2 is V2, !; C1 = '2', C4 = '1', valid_move(V1, V4), P1 is 1, P2 is 4, NV1 is V1, NV2 is V4, !; C1 = '2', C5 = '1', valid_move(V1, V5), P1 is 1, P2 is 5, NV1 is V1, NV2 is V5, !;
	(C2 = '2', C1 = '1', valid_move(V2, V1), P1 is 2, P2 is 1, NV1 is V2, NV2 is V1, !; C2 = '2', C3 = '1', valid_move(V2, V3), P1 is 2, P2 is 3, NV1 is V2, NV2 is V3, !; C2 = '2', C5 = '1', valid_move(V2, V5), P1 is 2, P2 is 5, NV1 is V2, NV2 is V5, !;
	(C3 = '2', C2 = '1', valid_move(V3, V2), P1 is 3, P2 is 2, NV1 is V3, NV2 is V2, !; C3 = '2', C5 = '1', valid_move(V3, V5), P1 is 3, P2 is 5, NV1 is V3, NV2 is V5, !; C3 = '2', C6 = '1', valid_move(V3, V6), P1 is 3, P2 is 6, NV1 is V3, NV2 is V6, !;
	(C4 = '2', C1 = '1', valid_move(V4, V1), P1 is 4, P2 is 1, NV1 is V4, NV2 is V1, !; C4 = '2', C5 = '1', valid_move(V4, V5), P1 is 4, P2 is 5, NV1 is V4, NV2 is V5, !; C4 = '2', C7 = '1', valid_move(V4, V7), P1 is 4, P2 is 7, NV1 is V4, NV2 is V7, !; C4 = '2', C8 = '1', valid_move(V4, V8), P1 is 4, P2 is 8, NV1 is V4, NV2 is V8, !;
	(C5 = '2', C1 = '1', valid_move(V5, V1), P1 is 5, P2 is 1, NV1 is V5, NV2 is V1, !; C5 = '2', C2 = '1', valid_move(V5, V2), P1 is 5, P2 is 2, NV1 is V5, NV2 is V2, !; C5 = '2', C3 = '1', valid_move(V5, V3), P1 is 5, P2 is 3, NV1 is V5, NV2 is V3, !; C5 = '2', C4 = '1', valid_move(V5, V4), P1 is 5, P2 is 4, NV1 is V5, NV2 is V4, !; C5 = '2', C6 = '1', valid_move(V5, V6), P1 is 5, P2 is 6, NV1 is V5, NV2 is V6, !; C5 = '2', C8 = '1', valid_move(V5, V8), P1 is 5, P2 is 8, NV1 is V5, NV2 is V8, !;
	(C6 = '2', C3 = '1', valid_move(V6, V3), P1 is 6, P2 is 3, NV1 is V6, NV2 is V3, !; C6 = '2', C5 = '1', valid_move(V6, V5), P1 is 6, P2 is 5, NV1 is V6, NV2 is V5, !; C6 = '2', C8 = '1', valid_move(V6, V8), P1 is 6, P2 is 8, NV1 is V6, NV2 is V8, !; C6 = '2', C9 = '1', valid_move(V6, V9), P1 is 6, P2 is 9, NV1 is V6, NV2 is V9, !;
	(C7 = '2', C4 = '1', valid_move(V7, V4), P1 is 7, P2 is 4, NV1 is V7, NV2 is V4, !; C7 = '2', C8 = '1', valid_move(V7, V8), P1 is 7, P2 is 8, NV1 is V7, NV2 is V8, !;
	(C8 = '2', C4 = '1', valid_move(V8, V4), P1 is 8, P2 is 4, NV1 is V8, NV2 is V4, !; C8 = '2', C5 = '1', valid_move(V8, V5), P1 is 8, P2 is 5, NV1 is V8, NV2 is V5, !; C8 = '2', C6 = '1', valid_move(V8, V6), P1 is 8, P2 is 6, NV1 is V8, NV2 is V6, !; C8 = '2', C7 = '1', valid_move(V8, V7), P1 is 8, P2 is 7, NV1 is V8, NV2 is V7, !; C8 = '2', C9 = '1', valid_move(V8, V9), P1 is 8, P2 is 9, NV1 is V8, NV2 is V9, !;
	(C9 = '2', C6 = '1', valid_move(V9, V6), P1 is 9, P2 is 6, NV1 is V9, NV2 is V6, !; C9 = '2', C8 = '1', valid_move(V9, V8), P1 is 9, P2 is 8, NV1 is V9, NV2 is V8, !))))))))); fail.

choose_first_possible_move_board_2(P1, P2, NV1, NV2) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '2', C2 = '1', valid_move(V1, V2), P1 is 1, P2 is 2, NV1 is V1, NV2 is V2, !; C1 = '2', C4 = '1', valid_move(V1, V4), P1 is 1, P2 is 4, NV1 is V1, NV2 is V4, !; C1 = '2', C5 = '1', valid_move(V1, V5), P1 is 1, P2 is 5, NV1 is V1, NV2 is V5, !;
	(C2 = '2', C1 = '1', valid_move(V2, V1), P1 is 2, P2 is 1, NV1 is V2, NV2 is V1, !; C2 = '2', C3 = '1', valid_move(V2, V3), P1 is 2, P2 is 3, NV1 is V2, NV2 is V3, !; C2 = '2', C5 = '1', valid_move(V2, V5), P1 is 2, P2 is 5, NV1 is V2, NV2 is V5, !; C2 = '2', C6 = '1', valid_move(V2, V6), P1 is 2, P2 is 6, NV1 is V2, NV2 is V6, !;
	(C3 = '2', C2 = '1', valid_move(V3, V2), P1 is 3, P2 is 2, NV1 is V3, NV2 is V2, !; C3 = '2', C6 = '1', valid_move(V3, V6), P1 is 3, P2 is 6, NV1 is V3, NV2 is V6, !;
	(C4 = '2', C1 = '1', valid_move(V4, V1), P1 is 4, P2 is 1, NV1 is V4, NV2 is V1, !; C4 = '2', C5 = '1', valid_move(V4, V5), P1 is 4, P2 is 5, NV1 is V4, NV2 is V5, !; C4 = '2', C7 = '1', valid_move(V4, V7), P1 is 4, P2 is 7, NV1 is V4, NV2 is V7, !; C4 = '2', C8 = '1', valid_move(V4, V8), P1 is 4, P2 is 8, NV1 is V4, NV2 is V8, !;
	(C5 = '2', C1 = '1', valid_move(V5, V1), P1 is 5, P2 is 1, NV1 is V5, NV2 is V1, !; C5 = '2', C2 = '1', valid_move(V5, V2), P1 is 5, P2 is 2, NV1 is V5, NV2 is V2, !; C5 = '2', C4 = '1', valid_move(V5, V4), P1 is 5, P2 is 4, NV1 is V5, NV2 is V4, !; C5 = '2', C6 = '1', valid_move(V5, V6), P1 is 5, P2 is 6, NV1 is V5, NV2 is V6, !; C5 = '2', C8 = '1', valid_move(V5, V8), P1 is 5, P2 is 8, NV1 is V5, NV2 is V8, !; C5 = '2', C9 = '1', valid_move(V5, V9), P1 is 5, P2 is 9, NV1 is V5, NV2 is V9, !;
	(C6 = '2', C2 = '1', valid_move(V6, V2), P1 is 6, P2 is 2, NV1 is V6, NV2 is V2, !; C6 = '2', C3 = '1', valid_move(V6, V3), P1 is 6, P2 is 3, NV1 is V6, NV2 is V3, !; C6 = '2', C5 = '1', valid_move(V6, V5), P1 is 6, P2 is 5, NV1 is V6, NV2 is V5, !; C6 = '2', C9 = '1', valid_move(V6, V9), P1 is 6, P2 is 9, NV1 is V6, NV2 is V9, !;
	(C7 = '2', C4 = '1', valid_move(V7, V4), P1 is 7, P2 is 4, NV1 is V7, NV2 is V4, !; C7 = '2', C8 = '1', valid_move(V7, V8), P1 is 7, P2 is 8, NV1 is V7, NV2 is V8, !;
	(C8 = '2', C4 = '1', valid_move(V8, V4), P1 is 8, P2 is 4, NV1 is V8, NV2 is V4, !; C8 = '2', C5 = '1', valid_move(V8, V5), P1 is 8, P2 is 5, NV1 is V8, NV2 is V5, !; C8 = '2', C7 = '1', valid_move(V8, V7), P1 is 8, P2 is 7, NV1 is V8, NV2 is V7, !; C8 = '2', C9 = '1', valid_move(V8, V9), P1 is 8, P2 is 9, NV1 is V8, NV2 is V9, !;
	(C9 = '2', C5 = '1', valid_move(V9, V5), P1 is 9, P2 is 5, NV1 is V9, NV2 is V5, !; C9 = '2', C6 = '1', valid_move(V9, V6), P1 is 9, P2 is 6, NV1 is V9, NV2 is V6, !; C9 = '2', C8 = '1', valid_move(V9, V8), P1 is 9, P2 is 8, NV1 is V9, NV2 is V8, !))))))))); fail.

choose_first_possible_move_board_3(P1, P2, NV1, NV2) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '2', C2 = '1', valid_move(V1, V2), P1 is 1, P2 is 2, NV1 is V1, NV2 is V2, !; C1 = '2', C4 = '1', valid_move(V1, V4), P1 is 1, P2 is 4, NV1 is V1, NV2 is V4, !;
	(C2 = '2', C1 = '1', valid_move(V2, V1), P1 is 2, P2 is 1, NV1 is V2, NV2 is V1, !; C2 = '2', C3 = '1', valid_move(V2, V3), P1 is 2, P2 is 3, NV1 is V2, NV2 is V3, !; C2 = '2', C4 = '1', valid_move(V2, V4), P1 is 2, P2 is 4, NV1 is V2, NV2 is V4, !; C2 = '2', C5 = '1', valid_move(V2, V5), P1 is 2, P2 is 5, NV1 is V2, NV2 is V5, !;
	(C3 = '2', C2 = '1', valid_move(V3, V2), P1 is 3, P2 is 2, NV1 is V3, NV2 is V2, !; C3 = '2', C5 = '1', valid_move(V3, V5), P1 is 3, P2 is 5, NV1 is V3, NV2 is V5, !; C3 = '2', C6 = '1', valid_move(V3, V6), P1 is 3, P2 is 6, NV1 is V3, NV2 is V6, !;
	(C4 = '2', C1 = '1', valid_move(V4, V1), P1 is 4, P2 is 1, NV1 is V4, NV2 is V1, !; C4 = '2', C2 = '1', valid_move(V4, V2), P1 is 4, P2 is 2, NV1 is V4, NV2 is V2, !; C4 = '2', C5 = '1', valid_move(V4, V5), P1 is 4, P2 is 5, NV1 is V4, NV2 is V5, !; C4 = '2', C7 = '1', valid_move(V4, V7), P1 is 4, P2 is 7, NV1 is V4, NV2 is V7, !;
	(C5 = '2', C2 = '1', valid_move(V5, V2), P1 is 5, P2 is 2, NV1 is V5, NV2 is V2, !; C5 = '2', C3 = '1', valid_move(V5, V3), P1 is 5, P2 is 3, NV1 is V5, NV2 is V3, !; C5 = '2', C4 = '1', valid_move(V5, V4), P1 is 5, P2 is 4, NV1 is V5, NV2 is V4, !; C5 = '2', C6 = '1', valid_move(V5, V6), P1 is 5, P2 is 6, NV1 is V5, NV2 is V6, !; C5 = '2', C7 = '1', valid_move(V5, V7), P1 is 5, P2 is 7, NV1 is V5, NV2 is V7, !; C5 = '2', C8 = '1', valid_move(V5, V8), P1 is 5, P2 is 8, NV1 is V5, NV2 is V8, !;
	(C6 = '2', C3 = '1', valid_move(V6, V3), P1 is 6, P2 is 3, NV1 is V6, NV2 is V3, !; C6 = '2', C5 = '1', valid_move(V6, V5), P1 is 6, P2 is 5, NV1 is V6, NV2 is V5, !; C6 = '2', C8 = '1', valid_move(V6, V8), P1 is 6, P2 is 8, NV1 is V6, NV2 is V8, !; C6 = '2', C9 = '1', valid_move(V6, V9), P1 is 6, P2 is 9, NV1 is V6, NV2 is V9, !;
	(C7 = '2', C4 = '1', valid_move(V7, V4), P1 is 7, P2 is 4, NV1 is V7, NV2 is V4, !; C7 = '2', C5 = '1', valid_move(V7, V5), P1 is 7, P2 is 5, NV1 is V7, NV2 is V5, !; C7 = '2', C8 = '1', valid_move(V7, V8), P1 is 7, P2 is 8, NV1 is V7, NV2 is V8, !;
	(C8 = '2', C5 = '1', valid_move(V8, V5), P1 is 8, P2 is 5, NV1 is V8, NV2 is V5, !; C8 = '2', C6 = '1', valid_move(V8, V6), P1 is 8, P2 is 6, NV1 is V8, NV2 is V6, !; C8 = '2', C7 = '1', valid_move(V8, V7), P1 is 8, P2 is 7, NV1 is V8, NV2 is V7, !; C8 = '2', C9 = '1', valid_move(V8, V9), P1 is 8, P2 is 9, NV1 is V8, NV2 is V9, !;
	(C9 = '2', C6 = '1', valid_move(V9, V6), P1 is 9, P2 is 6, NV1 is V9, NV2 is V6, !; C9 = '2', C8 = '1', valid_move(V9, V8), P1 is 9, P2 is 8, NV1 is V9, NV2 is V8, !))))))))); fail.

choose_first_possible_move(P1, P2, NV1, NV2) :-
	chosen_board(1), choose_first_possible_move_board_1(P1, P2, NV1, NV2), !;
	chosen_board(2), choose_first_possible_move_board_2(P1, P2, NV1, NV2), !;
	chosen_board(3), choose_first_possible_move_board_3(P1, P2, NV1, NV2), !.

display_chosen(X, P) :-
	(X = sp, format('The PC placed a Small Piece on position number ~w!\n\n', [P]), !;
	(X = mp, format('The PC placed a Medium Piece on position number ~w!\n\n', [P]), !;
	(X = bp, format('The PC placed a Big Piece on position number ~w!\n\n', [P])))).

choose_random_piece(X) :-
	player_2(N1, N2, N3),
	random(0, 3, N),
	(N = 0, N1 > 0, X = sp, !;
	(N = 1, N2 > 0, X = mp, !;
	(N = 2, N3 > 0, X = bp, !;
	(N1 = 0, N2 = 0, N3 = 0, !))));
	choose_random_piece(X).

choose_random_position(P) :-
	random(1, 10, N),
	board([cell(C1, _), cell(C2, _), cell(C3, _),
		   cell(C4, _), cell(C5, _), cell(C6, _),
		   cell(C7, _), cell(C8, _), cell(C9, _)]),
	(N = 1, C1 = '_', P is 1, !;
	(N = 2, C2 = '_', P is 2, !;
	(N = 3, C3 = '_', P is 3, !;
	(N = 4, C4 = '_', P is 4, !;
	(N = 5, C5 = '_', P is 5, !;
	(N = 6, C6 = '_', P is 6, !;
	(N = 7, C7 = '_', P is 7, !;
	(N = 8, C8 = '_', P is 8, !;
	(N = 9, C9 = '_', P is 9, !))))))))), !;
	choose_random_position(P).

choose_random_move :-
	random(0, 2, N),
	(N = 0, choose_random_piece(X),
			piece_exists(X),
			choose_random_position(P),
			place_piece(X, P),
			display_chosen(X, P), !;
	(N = 1, choose_first_possible_move(P1, P2, V1, V2),
			check_creates_tower(V1, V2, NV),
			create_tower(P1, P2, NV),
			format('The PC moved a piece from position number ~w to position number ~w!\n\n', [P1, P2]), !));
	choose_random_move.

place_on_top(V) :-
	(V = 1, !;
	(V = 2, !;
	(V = 5, !;
	(V = 6, !;
	(V = 7, !))))).

choose_placement_board_1(P, V) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '_', place_on_top(V1), P is 2, V is V1, !; C1 = '1', C4 = '_', place_on_top(V1), P is 4, V is V1, !; C1 = '1', C5 = '_', place_on_top(V1), P is 5, V is V1, !;
	(C2 = '1', C1 = '_', place_on_top(V2), P is 1, V is V2, !; C2 = '1', C3 = '_', place_on_top(V2), P is 3, V is V2, !; C2 = '1', C5 = '_', place_on_top(V2), P is 5, V is V2, !;
	(C3 = '1', C2 = '_', place_on_top(V3), P is 2, V is V3, !; C3 = '1', C5 = '_', place_on_top(V3), P is 5, V is V3, !; C3 = '1', C6 = '_', place_on_top(V3), P is 6, V is V3, !;
	(C4 = '1', C1 = '_', place_on_top(V4), P is 1, V is V4, !; C4 = '1', C5 = '_', place_on_top(V4), P is 5, V is V4, !; C4 = '1', C7 = '_', place_on_top(V4), P is 7, V is V4, !; C4 = '1', C8 = '_', place_on_top(V4), P is 8, V is V4, !;
	(C5 = '1', C1 = '_', place_on_top(V5), P is 1, V is V5, !; C5 = '1', C2 = '_', place_on_top(V5), P is 2, V is V5, !; C5 = '1', C3 = '_', place_on_top(V5), P is 3, V is V5, !; C5 = '1', C4 = '_', place_on_top(V5), P is 4, V is V5, !; C5 = '1', C6 = '_', place_on_top(V5), P is 6, V is V5, !; C5 = '1', C8 = '_', place_on_top(V5), P is 8, V is V5, !;
	(C6 = '1', C3 = '_', place_on_top(V6), P is 3, V is V6, !; C6 = '1', C5 = '_', place_on_top(V6), P is 5, V is V6, !; C6 = '1', C8 = '_', place_on_top(V6), P is 8, V is V6, !; C6 = '1', C9 = '_', place_on_top(V6), P is 9, V is V6, !;
	(C7 = '1', C4 = '_', place_on_top(V7), P is 4, V is V7, !; C7 = '1', C8 = '_', place_on_top(V7), P is 8, V is V7, !;
	(C8 = '1', C4 = '_', place_on_top(V8), P is 4, V is V8, !; C8 = '1', C5 = '_', place_on_top(V8), P is 5, V is V8, !; C8 = '1', C6 = '_', place_on_top(V8), P is 6, V is V8, !; C8 = '1', C7 = '_', place_on_top(V8), P is 7, V is V8, !; C8 = '1', C9 = '_', place_on_top(V8), P is 9, V is V8, !;
	(C9 = '1', C6 = '_', place_on_top(V9), P is 6, V is V9, !; C9 = '1', C8 = '_', place_on_top(V9), P is 8, V is V9, !))))))))); fail.

choose_placement_board_2(P, V) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '_', place_on_top(V1), P is 2, V is V1, !; C1 = '1', C4 = '_', place_on_top(V1), P is 4, V is V1, !; C1 = '1', C5 = '_', place_on_top(V1), P is 5, V is V1, !;
	(C2 = '1', C1 = '_', place_on_top(V2), P is 1, V is V2, !; C2 = '1', C3 = '_', place_on_top(V2), P is 3, V is V2, !; C2 = '1', C5 = '_', place_on_top(V2), P is 5, V is V2, !; C2 = '1', C6 = '_', place_on_top(V2), P is 6, V is V2, !;
	(C3 = '1', C2 = '_', place_on_top(V3), P is 2, V is V3, !; C3 = '1', C6 = '_', place_on_top(V3), P is 6, V is V3, !;
	(C4 = '1', C1 = '_', place_on_top(V4), P is 1, V is V4, !; C4 = '1', C5 = '_', place_on_top(V4), P is 5, V is V4, !; C4 = '1', C7 = '_', place_on_top(V4), P is 7, V is V4, !; C4 = '1', C8 = '_', place_on_top(V4), P is 8, V is V4, !;
	(C5 = '1', C1 = '_', place_on_top(V5), P is 1, V is V5, !; C5 = '1', C2 = '_', place_on_top(V5), P is 2, V is V5, !; C5 = '1', C4 = '_', place_on_top(V5), P is 4, V is V5, !; C5 = '1', C6 = '_', place_on_top(V5), P is 6, V is V5, !; C5 = '1', C8 = '_', place_on_top(V5), P is 8, V is V5, !; C5 = '1', C9 = '_', place_on_top(V5), P is 9, V is V5, !;
	(C6 = '1', C2 = '_', place_on_top(V6), P is 2, V is V6, !; C6 = '1', C3 = '_', place_on_top(V6), P is 3, V is V6, !; C6 = '1', C5 = '_', place_on_top(V6), P is 5, V is V6, !; C6 = '1', C9 = '_', place_on_top(V6), P is 9, V is V6, !;
	(C7 = '1', C4 = '_', place_on_top(V7), P is 4, V is V7, !; C7 = '1', C8 = '_', place_on_top(V7), P is 8, V is V7, !;
	(C8 = '1', C4 = '_', place_on_top(V8), P is 4, V is V8, !; C8 = '1', C5 = '_', place_on_top(V8), P is 5, V is V8, !; C8 = '1', C7 = '_', place_on_top(V8), P is 7, V is V8, !; C8 = '1', C9 = '_', place_on_top(V8), P is 9, V is V8, !;
	(C9 = '1', C5 = '_', place_on_top(V9), P is 5, V is V9, !; C9 = '1', C6 = '_', place_on_top(V9), P is 6, V is V9, !; C9 = '1', C8 = '_', place_on_top(V9), P is 8, V is V9, !))))))))); fail.

choose_placement_board_3(P, V) :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '_', place_on_top(V1), P is 2, V is V1, !; C1 = '1', C4 = '_', place_on_top(V1), P is 4, V is V1, !;
	(C2 = '1', C1 = '_', place_on_top(V2), P is 1, V is V2, !; C2 = '1', C3 = '_', place_on_top(V2), P is 3, V is V2, !; C2 = '1', C4 = '_', place_on_top(V2), P is 4, V is V2, !; C2 = '1', C5 = '_', place_on_top(V2), P is 5, V is V2, !;
	(C3 = '1', C2 = '_', place_on_top(V3), P is 2, V is V3, !; C3 = '1', C5 = '_', place_on_top(V3), P is 5, V is V3, !; C3 = '1', C6 = '_', place_on_top(V3), P is 6, V is V3, !;
	(C4 = '1', C1 = '_', place_on_top(V4), P is 1, V is V4, !; C4 = '1', C2 = '_', place_on_top(V4), P is 2, V is V4, !; C4 = '1', C5 = '_', place_on_top(V4), P is 5, V is V4, !; C4 = '1', C7 = '_', place_on_top(V4), P is 7, V is V4, !;
	(C5 = '1', C2 = '_', place_on_top(V5), P is 2, V is V5, !; C5 = '1', C3 = '_', place_on_top(V5), P is 3, V is V5, !; C5 = '1', C4 = '_', place_on_top(V5), P is 4, V is V5, !; C5 = '1', C6 = '_', place_on_top(V5), P is 6, V is V5, !; C5 = '1', C7 = '_', place_on_top(V5), P is 7, V is V5, !; C5 = '1', C8 = '_', place_on_top(V5), P is 8, V is V5, !;
	(C6 = '1', C3 = '_', place_on_top(V6), P is 3, V is V6, !; C6 = '1', C5 = '_', place_on_top(V6), P is 5, V is V6, !; C6 = '1', C8 = '_', place_on_top(V6), P is 8, V is V6, !; C6 = '1', C9 = '_', place_on_top(V6), P is 9, V is V6, !;
	(C7 = '1', C4 = '_', place_on_top(V7), P is 4, V is V7, !; C7 = '1', C5 = '_', place_on_top(V7), P is 5, V is V7, !; C7 = '1', C8 = '_', place_on_top(V7), P is 8, V is V7, !;
	(C8 = '1', C5 = '_', place_on_top(V8), P is 5, V is V8, !; C8 = '1', C6 = '_', place_on_top(V8), P is 6, V is V8, !; C8 = '1', C7 = '_', place_on_top(V8), P is 7, V is V8, !; C8 = '1', C9 = '_', place_on_top(V8), P is 9, V is V8, !;
	(C9 = '1', C6 = '_', place_on_top(V9), P is 6, V is V9, !; C9 = '1', C8 = '_', place_on_top(V9), P is 8, V is V9, !))))))))); fail.

choose_placement_board(P, V) :-
	chosen_board(1), choose_placement_board_1(P, V), !;
	chosen_board(2), choose_placement_board_2(P, V), !;
	chosen_board(3), choose_placement_board_3(P, V), !.

piece_exist_2(P) :-
	player_2(N1, N2, N3),
	(P = sp, N1 > 0, !;
	(P = mp, N2 > 0, !;
	(P = bp, N3 > 0, !))).

choose_piece_acordingly(V, X) :-
	(V = 1, piece_exist_2(bp), X = bp, !;
	(V = 2, piece_exist_2(sp), X = sp, !;
	(V = 5, piece_exist_2(mp), X = mp, !;
	(V = 6, piece_exist_2(mp), X = mp, !;
	(V = 7, piece_exist_2(sp), X = sp, !))))).

choose_wise_move :-
	choose_first_possible_move(P1, P2, V1, V2),
	check_creates_tower(V1, V2, NV),
	create_tower(P1, P2, NV),
	format('The PC moved a piece from position number ~w to position number ~w!\n\n', [P1, P2]), !;
	choose_placement_board(P, V),
	choose_piece_acordingly(V, X),
	place_piece(X, P),
	display_chosen(X, P), !;
	choose_random_piece(X),
	piece_exists(X),
	choose_random_position(P),
	place_piece(X, P),
	display_chosen(X, P), !.