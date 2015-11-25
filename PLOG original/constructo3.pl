:- use_module(library(system)).
:- use_module(library(random)).
:- ['constructo3Interface.pl'].
:- ['constructo3AI.pl'].

:- dynamic turn/1.
turn(pl1).

:- dynamic var_a/1.
var_a(n).

:- dynamic var_b/1.
var_b(n).

:- dynamic var_c/1.
var_c(n).

:- dynamic round/1.
round(1).

:- dynamic player_1/3.
player_1(3, 3, 3).

:- dynamic player_2/3.
player_2(3, 3, 3).

:- dynamic game_mode/1.
game_mode(n).

:- dynamic terminated/1.
terminated(0).

:- dynamic difficulty/1.
difficulty(n).

:- dynamic chosen_board/1.
chosen_board(0).

:- dynamic points_player_1/1.
points_player_1(0).

:- dynamic points_player_2/1.
points_player_2(0).

:- dynamic board/1.
board([cell('_', 0), cell('_', 0), cell('_', 0),
	   cell('_', 0), cell('_', 0), cell('_', 0),
	   cell('_', 0), cell('_', 0), cell('_', 0)]).

change_cell(P, C, NV) :-
	board([C1, C2, C3, C4, C5, C6, C7, C8, C9]),
	retract(board([_, _, _, _, _, _, _, _, _])),
	(P = 1, assert(board([cell(C, NV), C2, C3, C4, C5, C6, C7, C8, C9])), !;
	(P = 2, assert(board([C1, cell(C, NV), C3, C4, C5, C6, C7, C8, C9])), !;
	(P = 3, assert(board([C1, C2, cell(C, NV), C4, C5, C6, C7, C8, C9])), !;
	(P = 4, assert(board([C1, C2, C3, cell(C, NV), C5, C6, C7, C8, C9])), !;
	(P = 5, assert(board([C1, C2, C3, C4, cell(C, NV), C6, C7, C8, C9])), !;
	(P = 6, assert(board([C1, C2, C3, C4, C5, cell(C, NV), C7, C8, C9])), !;
	(P = 7, assert(board([C1, C2, C3, C4, C5, C6, cell(C, NV), C8, C9])), !;
	(P = 8, assert(board([C1, C2, C3, C4, C5, C6, C7, cell(C, NV), C9])), !;
	(P = 9, assert(board([C1, C2, C3, C4, C5, C6, C7, C8, cell(C, NV)])), !))))))))).

compare(V1, V2) :-
	V1 = 1, V2 = 2, !; V1 = 1, V2 = 7, !;
	V1 = 2, V2 = 5, !; V1 = 2, V2 = 6, !;
	V1 = 5, V2 = 1, !;
	V1 = 2, V2 = 1, !; V1 = 7, V2 = 1, !;
	V1 = 5, V2 = 2, !; V1 = 6, V2 = 2, !;
	V1 = 1, V2 = 5, !;
	fail.

no_moves_left_board_1 :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '2', compare(V1, V2), !, fail; C1 = '1', C4 = '2', compare(V1, V4), !, fail; C1 = '1', C5 = '2', compare(V1, V5), !, fail;
	(C2 = '1', C1 = '2', compare(V2, V1), !, fail; C2 = '1', C3 = '2', compare(V2, V3), !, fail; C2 = '1', C5 = '2', compare(V2, V5), !, fail;
	(C3 = '1', C2 = '2', compare(V3, V2), !, fail; C3 = '1', C5 = '2', compare(V3, V5), !, fail; C3 = '1', C6 = '2', compare(V3, V6), !, fail;
	(C4 = '1', C1 = '2', compare(V4, V1), !, fail; C4 = '1', C5 = '2', compare(V4, V5), !, fail; C4 = '1', C7 = '2', compare(V4, V7), !, fail; C4 = '1', C8 = '2', compare(V4, V8), !, fail;
	(C5 = '1', C1 = '2', compare(V5, V1), !, fail; C5 = '1', C2 = '2', compare(V5, V2), !, fail; C5 = '1', C3 = '2', compare(V5, V3), !, fail; C5 = '1', C4 = '2', compare(V5, V4), !, fail; C5 = '1', C6 = '2', compare(V5, V6), !, fail; C5 = '1', C8 = '2', compare(V5, V8), !, fail;
	(C6 = '1', C3 = '2', compare(V6, V3), !, fail; C6 = '1', C5 = '2', compare(V6, V5), !, fail; C6 = '1', C8 = '2', compare(V6, V8), !, fail; C6 = '1', C9 = '2', compare(V6, V9), !, fail;
	(C7 = '1', C4 = '2', compare(V7, V4), !, fail; C7 = '1', C8 = '2', compare(V7, V8), !, fail;
	(C8 = '1', C4 = '2', compare(V8, V4), !, fail; C8 = '1', C5 = '2', compare(V8, V5), !, fail; C8 = '1', C6 = '2', compare(V8, V6), !, fail; C8 = '1', C7 = '2', compare(V8, V7), !, fail; C8 = '1', C9 = '2', compare(V8, V9), !, fail;
	(C9 = '1', C6 = '2', compare(V9, V6), !, fail; C9 = '1', C8 = '2', compare(V9, V8), !, fail))))))))); !.

no_moves_left_board_2 :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '2', compare(V1, V2), !, fail; C1 = '1', C4 = '2', compare(V1, V4), !, fail; C1 = '1', C5 = '2', compare(V1, V5), !, fail;
	(C2 = '1', C1 = '2', compare(V2, V1), !, fail; C2 = '1', C3 = '2', compare(V2, V3), !, fail; C2 = '1', C5 = '2', compare(V2, V5), !, fail; C2 = '1', C6 = '2', compare(V2, V6), !, fail;
	(C3 = '1', C2 = '2', compare(V3, V2), !, fail; C3 = '1', C6 = '2', compare(V3, V6), !, fail;
	(C4 = '1', C1 = '2', compare(V4, V1), !, fail; C4 = '1', C5 = '2', compare(V4, V5), !, fail; C4 = '1', C7 = '2', compare(V4, V7), !, fail; C4 = '1', C8 = '2', compare(V4, V8), !, fail;
	(C5 = '1', C1 = '2', compare(V5, V1), !, fail; C5 = '1', C2 = '2', compare(V5, V2), !, fail; C5 = '1', C4 = '2', compare(V5, V4), !, fail; C5 = '1', C6 = '2', compare(V5, V6), !, fail; C5 = '1', C8 = '2', compare(V5, V8), !, fail; C5 = '1', C9 = '2', compare(V5, V9), !, fail;
	(C6 = '1', C2 = '2', compare(V6, V2), !, fail; C6 = '1', C3 = '2', compare(V6, V3), !, fail; C6 = '1', C5 = '2', compare(V6, V5), !, fail; C6 = '1', C9 = '2', compare(V6, V9), !, fail;
	(C7 = '1', C4 = '2', compare(V7, V4), !, fail; C7 = '1', C8 = '2', compare(V7, V8), !, fail;
	(C8 = '1', C4 = '2', compare(V8, V4), !, fail; C8 = '1', C5 = '2', compare(V8, V5), !, fail; C8 = '1', C7 = '2', compare(V8, V7), !, fail; C8 = '1', C9 = '2', compare(V8, V9), !, fail;
	(C9 = '1', C5 = '2', compare(V9, V5), !, fail; C9 = '1', C6 = '2', compare(V9, V6), !, fail; C9 = '1', C8 = '2', compare(V9, V8), !, fail))))))))); !.

no_moves_left_board_3 :-
	board([cell(C1, V1), cell(C2, V2), cell(C3, V3),
		   cell(C4, V4), cell(C5, V5), cell(C6, V6),
		   cell(C7, V7), cell(C8, V8), cell(C9, V9)]),
	(C1 = '1', C2 = '2', compare(V1, V2), !, fail; C1 = '1', C4 = '2', compare(V1, V4), !, fail;
	(C2 = '1', C1 = '2', compare(V2, V1), !, fail; C2 = '1', C3 = '2', compare(V2, V3), !, fail; C2 = '1', C4 = '2', compare(V2, V4), !, fail; C2 = '1', C5 = '2', compare(V2, V5), !, fail;
	(C3 = '1', C2 = '2', compare(V3, V2), !, fail; C3 = '1', C5 = '2', compare(V3, V5), !, fail; C3 = '1', C6 = '2', compare(V3, V6), !, fail;
	(C4 = '1', C1 = '2', compare(V4, V1), !, fail; C4 = '1', C2 = '2', compare(V4, V2), !, fail; C4 = '1', C5 = '2', compare(V4, V5), !, fail; C4 = '1', C7 = '2', compare(V4, V7), !, fail;
	(C5 = '1', C2 = '2', compare(V5, V2), !, fail; C5 = '1', C3 = '2', compare(V5, V3), !, fail; C5 = '1', C4 = '2', compare(V5, V4), !, fail; C5 = '1', C6 = '2', compare(V5, V6), !, fail; C5 = '1', C7 = '2', compare(V5, V7), !, fail; C5 = '1', C8 = '2', compare(V5, V8), !, fail;
	(C6 = '1', C3 = '2', compare(V6, V3), !, fail; C6 = '1', C5 = '2', compare(V6, V5), !, fail; C6 = '1', C8 = '2', compare(V6, V8), !, fail; C6 = '1', C9 = '2', compare(V6, V9), !, fail;
	(C7 = '1', C4 = '2', compare(V7, V4), !, fail; C7 = '1', C5 = '2', compare(V7, V5), !, fail; C7 = '1', C8 = '2', compare(V7, V8), !, fail;
	(C8 = '1', C5 = '2', compare(V8, V5), !, fail; C8 = '1', C6 = '2', compare(V8, V6), !, fail; C8 = '1', C7 = '2', compare(V8, V7), !, fail; C8 = '1', C9 = '2', compare(V8, V9), !, fail;
	(C9 = '1', C6 = '2', compare(V9, V6), !, fail; C9 = '1', C8 = '2', compare(V9, V8), !, fail))))))))); !.

no_moves_left :-
	chosen_board(1), no_moves_left_board_1, !;
	chosen_board(2), no_moves_left_board_2, !;
	chosen_board(3), no_moves_left_board_3, !.

avaiable_pos_placement_loop([], _) :- fail.
avaiable_pos_placement_loop([H|T], P) :-
	P = 1, H = cell('_', 0);
	P1 is P - 1,
	avaiable_pos_placement_loop(T, P1).

avaiable_pos_placement(P) :-
	board(L),
	avaiable_pos_placement_loop(L, P), !;
	write('Invalid position!\n'), fail.

piece_exists_player_1(P) :-
	player_1(N1, N2, N3),
	(P = sp, N1 > 0, !;
	(P = mp, N2 > 0, !;
	(P = bp, N3 > 0, !)));
	write('Unavaiable piece!\n'), fail.

piece_exists_player_2(P) :-
	player_2(N1, N2, N3),
	(P = sp, N1 > 0, !;
	(P = mp, N2 > 0, !;
	(P = bp, N3 > 0, !)));
	write('Unavaiable piece!\n'), fail.

piece_exists(P) :-
	turn(pl1), piece_exists_player_1(P), !;
	turn(pl2), piece_exists_player_2(P).

remove_piece_player_1(P) :-
	player_1(N1, N2, N3),
	retract(player_1(_, _, _)),
	(P = sp, Nu is N1 - 1,
			   assert(player_1(Nu, N2, N3)), !;
	(P = mp, Nu is N2 - 1,
			   assert(player_1(N1, Nu, N3)), !;
	(P = bp, Nu is N3 - 1,
			   assert(player_1(N1, N2, Nu)), !))).

remove_piece_player_2(P) :-
	player_2(N1, N2, N3),
	retract(player_2(_, _, _)),
	(P = sp, Nu is N1 - 1,
			   assert(player_2(Nu, N2, N3)), !;
	(P = mp, Nu is N2 - 1,
			   assert(player_2(N1, Nu, N3)), !;
	(P = bp, Nu is N3 - 1,
			   assert(player_2(N1, N2, Nu)), !))).

place_small_piece(P) :-
	turn(pl1),
	remove_piece_player_1(sp), change_cell(P, '1', 1), !;
	turn(pl2),
	remove_piece_player_2(sp), change_cell(P, '2', 1).

place_medium_piece(P) :-
	turn(pl1),
	remove_piece_player_1(mp), change_cell(P, '1', 2), !;
	turn(pl2),
	remove_piece_player_2(mp), change_cell(P, '2', 2).

place_big_piece(P) :-
	turn(pl1),
	remove_piece_player_1(bp), change_cell(P, '1', 5), !;
	turn(pl2),
	remove_piece_player_2(bp), change_cell(P, '2', 5).

check_player_1_piece_loop([], _, _) :- fail.
check_player_1_piece_loop([H|T], P, V) :-
	P = 1, H = cell('1', OV), V is OV;
	P1 is P - 1,
	check_player_1_piece_loop(T, P1, V).

check_player_1_piece(P, V) :-
	board(L),
	check_player_1_piece_loop(L, P, V), !;
	write('This piece does not belong to Player 1 or it is an empty cell!\n\n'), fail.

check_player_2_piece_loop([], _, _) :- fail.
check_player_2_piece_loop([H|T], P, V) :-
	P = 1, H = cell('2', OV), V is OV;
	P1 is P - 1,
	check_player_2_piece_loop(T, P1, V).

check_player_2_piece(P, V) :-
	board(L),
	check_player_2_piece_loop(L, P, V), !;
	write('This piece does not belong to Player 2 or it is an empty cell!\n\n'), fail.

check_player_piece(P, V) :-
	turn(pl1), check_player_1_piece(P, V), !;
	turn(pl2), check_player_2_piece(P, V).

check_enemy_player_piece(P, V) :-
	turn(pl1), check_player_2_piece(P, V), !;
	turn(pl2), check_player_1_piece(P, V).

check_if_not_tower(V) :-
	V = 1, !;
	V = 2, !;
	V = 5, !;
	write('You cannot move a tower!\n'), fail.

adjacent_1(P1, P2) :-
	P1 = 1, P2 = 2, !; P1 = 1, P2 = 4, !; P1 = 1, P2 = 5, !;
	P1 = 2, P2 = 1, !; P1 = 2, P2 = 3, !; P1 = 2, P2 = 5, !;
	P1 = 3, P2 = 2, !; P1 = 3, P2 = 5, !; P1 = 3, P2 = 6, !;
	P1 = 4, P2 = 1, !; P1 = 4, P2 = 5, !; P1 = 4, P2 = 7, !; P1 = 4, P2 = 8, !;
	P1 = 5, P2 = 1, !; P1 = 5, P2 = 2, !; P1 = 5, P2 = 3, !; P1 = 5, P2 = 4, !; P1 = 5, P2 = 6, !; P1 = 5, P2 = 8, !;
	P1 = 6, P2 = 3, !; P1 = 6, P2 = 5, !; P1 = 6, P2 = 8, !; P1 = 6, P2 = 9, !;
	P1 = 7, P2 = 4, !; P1 = 7, P2 = 8, !;
	P1 = 8, P2 = 4, !; P1 = 8, P2 = 5, !; P1 = 8, P2 = 6, !; P1 = 8, P2 = 7, !; P1 = 8, P2 = 9, !;
	P1 = 9, P2 = 6, !; P1 = 9, P2 = 8, !;
	write('These positions are not adjacent to each other!\n'), fail.

adjacent_2(P1, P2) :-
	P1 = 1, P2 = 2, !; P1 = 1, P2 = 4, !; P1 = 1, P2 = 5, !;
	P1 = 2, P2 = 1, !; P1 = 2, P2 = 3, !; P1 = 2, P2 = 5, !; P1 = 2, P2 = 6, !;
	P1 = 3, P2 = 2, !; P1 = 3, P2 = 6, !;
	P1 = 4, P2 = 1, !; P1 = 4, P2 = 5, !; P1 = 4, P2 = 7, !; P1 = 4, P2 = 8, !;
	P1 = 5, P2 = 1, !; P1 = 5, P2 = 2, !; P1 = 5, P2 = 4, !; P1 = 5, P2 = 6, !; P1 = 5, P2 = 8, !; P1 = 5, P2 = 9, !;
	P1 = 6, P2 = 2, !; P1 = 6, P2 = 3, !; P1 = 6, P2 = 5, !; P1 = 6, P2 = 9, !;
	P1 = 7, P2 = 4, !; P1 = 7, P2 = 8, !;
	P1 = 8, P2 = 4, !; P1 = 8, P2 = 5, !; P1 = 8, P2 = 7, !; P1 = 8, P2 = 9, !;
	P1 = 9, P2 = 5, !; P1 = 9, P2 = 6, !; P1 = 9, P2 = 8, !;
	write('These positions are not adjacent to each other!\n'), fail.

adjacent_3(P1, P2) :-
	P1 = 1, P2 = 2, !; P1 = 1, P2 = 4, !;
	P1 = 2, P2 = 1, !; P1 = 2, P2 = 3, !; P1 = 2, P2 = 4, !; P1 = 2, P2 = 5, !;
	P1 = 3, P2 = 2, !; P1 = 3, P2 = 5, !; P1 = 3, P2 = 6, !;
	P1 = 4, P2 = 1, !; P1 = 4, P2 = 2, !; P1 = 4, P2 = 5, !; P1 = 4, P2 = 7, !;
	P1 = 5, P2 = 2, !; P1 = 5, P2 = 3, !; P1 = 5, P2 = 4, !; P1 = 5, P2 = 6, !; P1 = 5, P2 = 7, !; P1 = 5, P2 = 8, !;
	P1 = 6, P2 = 3, !; P1 = 6, P2 = 5, !; P1 = 6, P2 = 8, !; P1 = 6, P2 = 9, !;
	P1 = 7, P2 = 4, !; P1 = 7, P2 = 5, !; P1 = 7, P2 = 8, !;
	P1 = 8, P2 = 5, !; P1 = 8, P2 = 6, !; P1 = 8, P2 = 7, !; P1 = 8, P2 = 9, !;
	P1 = 9, P2 = 6, !; P1 = 9, P2 = 8, !;
	write('These positions are not adjacent to each other!\n'), fail.

check_creates_tower(V1, V2, NV) :-
	V1 = 1, V2 = 2, NV is V1 + V2, !; V1 = 1, V2 = 7, NV is V1 + V2, !;
	V1 = 2, V2 = 5, NV is V1 + V2, !; V1 = 2, V2 = 6, NV is V2 + 1, !;
	V1 = 5, V2 = 1, NV is V1 + V2, !;
	write('Invalid move!\nThese two pieces do not create a tower!\n'), fail.

create_tower(P1, P2, NV) :-
	change_cell(P1, '_', 0),
	(turn(pl1), change_cell(P2, '1', NV), !;
	(turn(pl2), change_cell(P2, '2', NV))).

move_piece(P1, P2) :-
	(chosen_board(1), adjacent_1(P1, P2), !;
	(chosen_board(2), adjacent_2(P1, P2), !;
	(chosen_board(3), adjacent_3(P1, P2), !))),
	check_player_piece(P1, V1),
	check_if_not_tower(V1),
	check_enemy_player_piece(P2, V2),
	check_creates_tower(V1, V2, NV),
	create_tower(P1, P2, NV).

place_piece(X, P) :-
	X = sp, place_small_piece(P), !;
	X = mp, place_medium_piece(P), !;
	X = bp, place_big_piece(P), !;
	write('Invalid piece!\n'), fail.

move :-
	write('\nWhere is the piece that you wish to move: '),
	read(P1),
	write('\nWhere to: '),
	read(P2),
	move_piece(P1, P2).

place :-
	write('\nChoose a piece to place:\n - Small Piece (sp)\n - Medium Piece (mp)\n - Big Piece (bp)\n'),
	read(X),
	piece_exists(X),
	write('\nWhere: '),
	read(P),
	avaiable_pos_placement(P),
	place_piece(X, P).

end_game :-
	reset_board,
	retract(round(_)),
	assert(round(2)),
	retract(player_1(_, _, _)),
	assert(player_1(0, 0, 0)),
	retract(player_2(_, _, _)),
	assert(player_2(0, 0, 0)),
	retract(terminated(_)),
	assert(terminated(1)).

place_or_move(I) :-
	I = m, move, !;
	I = p, place, !;
	I = e, end_game, !;
	I = s, !;
	I = h, print_boards, print_pieces, fail.

choose_move :-
	difficulty(e),
	choose_random_move, !;
	difficulty(h),
	choose_wise_move.

play_game_ai :-
	turn(pl1),
	write('Choose your next move:\n - Move an existing piece (m)\n - Place a new piece (p)\n - Skip (s)\n - Exit out of the game (e)\n - Help (h)\n'),
	read(I),
	place_or_move(I), !;
	turn(pl2),
	choose_move.

play_game_local :-
	write('Choose your next move:\n - Move an existing piece (m)\n - Place a new piece (p)\n - Skip (s)\n - Exit out of the game (e)\n - Help (h)\n'),
	read(I),
	place_or_move(I).

play_game :-
	game_mode(l),
	play_game_local, !;
	game_mode(c),
	play_game_ai.

count_points_player_1_loop([]).
count_points_player_1_loop([H|T]) :-
	(H = cell('1', 3), points_player_1(P), P1 is P + 1,
					   retract(points_player_1(_)),
					   assert(points_player_1(P1)),
					   count_points_player_1_loop(T), !;
	(H = cell('1', 7), points_player_1(P), P1 is P + 1,
					   retract(points_player_1(_)),
					   assert(points_player_1(P1)),
					   count_points_player_1_loop(T), !;
	(H = cell('1', 8), points_player_1(P), P1 is P + 1,
					   retract(points_player_1(_)),
					   assert(points_player_1(P1)),
					   count_points_player_1_loop(T), !)));
	count_points_player_1_loop(T).

count_points_player_2_loop([]).
count_points_player_2_loop([H|T]) :-
	(H = cell('2', 3), points_player_2(P), P1 is P + 1,
					   retract(points_player_2(_)),
					   assert(points_player_2(P1)),
					   count_points_player_2_loop(T), !;
	(H = cell('2', 7), points_player_2(P), P1 is P + 1,
					   retract(points_player_2(_)),
					   assert(points_player_2(P1)),
					   count_points_player_2_loop(T), !;
	(H = cell('2', 8), points_player_2(P), P1 is P + 1,
					   retract(points_player_2(_)),
					   assert(points_player_2(P1)),
					   count_points_player_2_loop(T), !)));
	count_points_player_2_loop(T).

count_points_players :-
	board(L),
	count_points_player_1_loop(L),
	count_points_player_2_loop(L), !.

reset_board :-
	retract(board([_, _, _, _, _, _, _, _, _])),
	assert(board([cell('_', 0), cell('_', 0), cell('_', 0),
				  cell('_', 0), cell('_', 0), cell('_', 0),
				  cell('_', 0), cell('_', 0), cell('_', 0)])).

reset_players :-
	retract(player_1(_, _, _)),
	assert(player_1(3, 3, 3)),
	retract(player_2(_, _, _)),
	assert(player_2(3, 3, 3)).

reset_game :-
	round(1),
	reset_board,
	reset_players, !;
	round(2).

round_over :-
	no_moves_left,
	player_1(0, 0, 0), !;
	no_moves_left,
	player_2(0, 0, 0).

game_over :-
	round(1),
	switch_round,
	set_player, !, fail;
	round(2),
	no_moves_left,
	player_1(0, 0, 0), !;
	round(2),
	no_moves_left,
	player_2(0, 0, 0).

switch_round :-
	retract(round(_)),
	assert(round(2)).

switch_player :-
	turn(pl1),
	retract(turn(pl1)), assert(turn(pl2)), !;
	turn(pl2),
	retract(turn(pl2)), assert(turn(pl1)).

set_player :-
	round(1),
	retract(turn(_)),
	assert(turn(pl1)), !;
	round(2),
	retract(turn(_)),
	assert(turn(pl2)).

choose_game_mode :-
	write('Choose a game mode:\n - Versus local opponent (l)\n - Versus computer (c)\n'),
	read(I),
	(I = l, retract(game_mode(_)),
			assert(game_mode(l)), !;
	(I = c, retract(game_mode(_)),
			assert(game_mode(c)),
			choose_difficulty));
	write('Invalid input!\n'), choose_game_mode.

choose_board :-
	write('Choose a board to play with: \n'),
	print_boards,
	read(I),
	(I = 1, retract(chosen_board(_)),
			assert(chosen_board(1)), !;
	(I = 2, retract(chosen_board(_)),
			assert(chosen_board(2)), !;
	(I = 3, retract(chosen_board(_)),
			assert(chosen_board(3)))));
	write('Invalid input!\n'), choose_board.

choose_difficulty :-
	write('Choose difficulty:\n - Easy (e)\n - Hard (h)\n'),
	read(I),
	(I = e, retract(difficulty(_)),
			assert(difficulty(e)), !;
	(I = h, retract(difficulty(_)),
			assert(difficulty(h))));
	write('Invalid input!\n'), choose_difficulty.

retract_everything :-
	retractall(turn(_)),
	retractall(var_a(_)),
	retractall(var_b(_)),
	retractall(var_c(_)),
	retractall(round(_)),
	retractall(player_1(_, _, _)),
	retractall(player_2(_, _, _)),
	retractall(game_mode(_)),
	retractall(terminated(_)),
	retractall(difficulty(_)),
	retractall(chosen_board(_)),
	retractall(points_player_1(_)),
	retractall(points_player_2(_)),
	retractall(board([_, _, _, _, _, _, _, _, _])).

assert_everything :-
	assert(turn(pl1)),
	assert(var_a(n)),
	assert(var_b(n)),
	assert(var_c(n)),
	assert(round(1)),
	assert(player_1(3, 3, 3)),
	assert(player_2(3, 3, 3)),
	assert(game_mode(n)),
	assert(terminated(0)),
	assert(difficulty(n)),
	assert(chosen_board(0)),
	assert(points_player_1(0)),
	assert(points_player_2(0)),
	assert(board([cell('_', 0), cell('_', 0), cell('_', 0),
				  cell('_', 0), cell('_', 0), cell('_', 0),
				  cell('_', 0), cell('_', 0), cell('_', 0)])).

start_game :-
	choose_game_mode,
	choose_board,
	set_player,
	repeat,
	display_info,
	play_game,
	switch_player,
	round_over,
	count_points_players,
	display_info,
	display_time(5),
	reset_game,
	game_over,
	display_winner.